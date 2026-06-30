import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload
} from "antd";
import toast from "react-hot-toast";
import { adminApi } from "../services/api";

function ProductsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [viewer, setViewer] = useState({ open: false, src: "" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchMeta = async () => {
    const catRes = await adminApi.get("/categories");
    setCategories(catRes.data.data || []);
  };

  const fetchItems = async (nextPage = page, query = search) => {
    setLoading(true);
    try {
      const res = await adminApi.get("/products", { params: { page: nextPage, limit: 8, search: query } });
      setItems(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeta();
    fetchItems(1, "");
  }, []);

  useEffect(
    () => () => {
      previewImages.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    },
    [previewImages]
  );

  const openViewer = (src) => setViewer({ open: true, src });
  const activeImageSrc = previewImages[previewIndex] || "";

  const resetProductModalState = () => {
    setImageFiles([]);
    setPreviewImages([]);
    setPreviewIndex(0);
    form.resetFields();
  };

  const submit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name ?? "");
    formData.append("category", values.category ?? "");
    formData.append("price", values.price ?? "");
    formData.append("description", values.description ?? "");
    formData.append("specs", JSON.stringify(values.specs || []));
    imageFiles.forEach((file) => formData.append("images", file));

    setSubmitting(true);
    try {
      if (editing) await adminApi.put(`/products/${editing._id}`, formData);
      else await adminApi.post("/products", formData);
      toast.success("Saved successfully");
      setOpen(false);
      setEditing(null);
      resetProductModalState();
      fetchItems(page, search);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id) => {
    try {
      await adminApi.delete(`/products/${id}`);
      toast.success("Deleted");
      fetchItems(page, search);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Space style={{ marginBottom: 12 }}>
        <Input.Search
          placeholder="Search products"
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
            fetchItems(1, value);
          }}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            resetProductModalState();
            form.setFieldsValue({ specs: [{ label: "", value: "" }] });
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Space>
      <Table
        loading={loading}
        style={{ fontSize: 16 }}
        dataSource={items}
        rowKey="_id"
        pagination={{
          pageSize: 8,
          onChange: (nextPage) => {
            setPage(nextPage);
            fetchItems(nextPage, search);
          }
        }}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Category", render: (_, r) => r.category?.name || "-" },
          {
            title: "Image",
            dataIndex: "images",
            render: (value, record) =>
              (value?.[0] || record.image) ? (
                <div
                  className="admin-clickable-image admin-clickable-image--table"
                  onClick={() => openViewer(value?.[0] || record.image)}
                >
                  <img src={value?.[0] || record.image} alt={record.name} />
                  <div className="admin-clickable-image__overlay">
                    <EyeOutlined />
                  </div>
                </div>
              ) : (
                "-"
              )
          },

          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    const initialImages =
                      Array.isArray(record.images) && record.images.length > 0
                        ? record.images
                        : record.image
                          ? [record.image]
                          : [];
                    setImageFiles([]);
                    setPreviewImages(initialImages);
                    setPreviewIndex(0);
                    form.setFieldsValue({
                      name: record.name,
                      category: record.category?._id,
                      price: record.price,
                      description: record.description,
                      specs:
                        Array.isArray(record.specs) && record.specs.length > 0
                          ? record.specs
                          : [{ label: "", value: "" }]
                    });
                    setOpen(true);
                  }}
                  icon={<EditOutlined />}
                >
                </Button>
                <Popconfirm title="Delete product?" onConfirm={() => remove(record._id)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
      <Modal
        open={open}
        title={editing ? "Edit Product" : "Add Product"}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
          resetProductModalState();
        }}
        footer={null}
        centered
        width="min(720px, calc(100vw - 16px))"
        styles={{
          content: { maxWidth: "calc(100vw - 8px)" },
          body: {
            maxHeight: "min(85vh, calc(100dvh - 120px))",
            overflowY: "auto",
            paddingRight: 8,
          },
        }}
      >
        <Form layout="vertical" form={form} onFinish={submit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select options={categories.map((c) => ({ value: c._id, label: c.name }))} />
          </Form.Item>
          
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Product Images">
            <Upload
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => {
                const files = info.fileList
                  .map((entry) => entry.originFileObj)
                  .filter(Boolean);
                setImageFiles(files);
                const nextPreviews = files.map((item) => URL.createObjectURL(item));
                previewImages.forEach((url) => {
                  if (url.startsWith("blob:")) URL.revokeObjectURL(url);
                });
                setPreviewImages(nextPreviews);
                setPreviewIndex(0);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Multiple Images</Button>
            </Upload>
          </Form.Item>

          {activeImageSrc ? (
            <div style={{ marginBottom: 18 }}>
              <div
                className="admin-clickable-image"
                style={{ width: "100%", height: 220 }}
                onClick={() => openViewer(activeImageSrc)}
              >
                <img src={activeImageSrc} alt="Product preview" />
                <div className="admin-clickable-image__overlay">
                  <EyeOutlined />
                </div>
              </div>
              <Space style={{ marginTop: 10 }}>
                <Button
                  icon={<LeftOutlined />}
                  disabled={previewImages.length <= 1}
                  onClick={() => setPreviewIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length)}
                />
                <span style={{ color: "rgba(0,0,0,0.65)", fontSize: 13 }}>
                  {previewIndex + 1} / {previewImages.length}
                </span>
                <Button
                  icon={<RightOutlined />}
                  disabled={previewImages.length <= 1}
                  onClick={() => setPreviewIndex((prev) => (prev + 1) % previewImages.length)}
                />
              </Space>
            </div>
          ) : null}

          <Divider orientation="left" style={{ marginTop: 8 }}>
            Product Details Fields
          </Divider>
          <Form.List name="specs">
            {(fields, { add, remove: removeSpec }) => (
              <>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="mb-2 grid grid-cols-1 items-start gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:gap-2"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "label"]}
                      rules={[{ required: true, message: "Field name required" }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Field name (e.g. Brand)" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "value"]}
                      rules={[{ required: true, message: "Value required" }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Field value" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeSpec(field.name)} />
                  </div>
                ))}
                <Button style={{ marginTop: 8, marginBottom: 8 }} type="dashed" icon={<PlusOutlined />} onClick={() => add({ label: "", value: "" })} block>
                  Add Detail Field
                </Button>
              </>
            )}
          </Form.List>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Save
          </Button>
        </Form>
      </Modal>
      <Modal
        open={viewer.open}
        title="Image Preview"
        footer={null}
        onCancel={() => setViewer({ open: false, src: "" })}
        width="min(720px, calc(100vw - 16px))"
        centered
        zIndex={2100}
        styles={{
          body: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          },
        }}
        destroyOnClose
      >
        {viewer.src ? (
          <img
            src={viewer.src}
            alt="Preview"
            style={{ width: "100%", maxHeight: "min(80vh, 640px)", objectFit: "contain" }}
          />
        ) : null}
      </Modal>
    </motion.div>
  );
}

export default ProductsPage;
