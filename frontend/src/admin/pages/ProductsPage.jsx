import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DeleteOutlined, EditOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Upload
} from "antd";
import toast from "react-hot-toast";
import { adminApi } from "../services/api";

function ProductsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isCurrentImageRemoved, setIsCurrentImageRemoved] = useState(false);
  const [viewer, setViewer] = useState({ open: false, src: "" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchMeta = async () => {
    const [catRes, offerRes] = await Promise.all([adminApi.get("/categories"), adminApi.get("/offers")]);
    setCategories(catRes.data.data || []);
    setOffers(offerRes.data.data || []);
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

  useEffect(() => {
    if (!file) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [file]);

  const openViewer = (src) => setViewer({ open: true, src });
  const activeImageSrc = imagePreview || (!isCurrentImageRemoved ? editing?.image || "" : "");

  const submit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value ?? ""));
    if (file) formData.append("image", file);

    try {
      if (editing) await adminApi.put(`/products/${editing._id}`, formData);
      else await adminApi.post("/products", formData);
      toast.success("Saved successfully");
      setOpen(false);
      setEditing(null);
      setFile(null);
      setImagePreview("");
      setIsCurrentImageRemoved(false);
      form.resetFields();
      fetchItems(page, search);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Save failed");
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
            setFile(null);
            setImagePreview("");
            setIsCurrentImageRemoved(false);
            form.resetFields();
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
            dataIndex: "image",
            render: (value, record) =>
              value ? (
                <div className="admin-clickable-image admin-clickable-image--table" onClick={() => openViewer(value)}>
                  <img src={value} alt={record.name} />
                  <div className="admin-clickable-image__overlay">
                    <EyeOutlined />
                  </div>
                </div>
              ) : (
                "-"
              )
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => `$${Number(value).toFixed(2)}`
          },
          {
            title: "Offer",
            render: (_, r) =>
              r.offer ? <Tag color="green">{r.offer.title}</Tag> : <Tag color="default">None</Tag>
          },
          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    setFile(null);
                    setImagePreview("");
                    setIsCurrentImageRemoved(false);
                    form.setFieldsValue({
                      name: record.name,
                      category: record.category?._id,
                      price: record.price,
                      offer: record.offer?._id,
                      description: record.description
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
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        styles={{ body: { height: "68vh", overflowY: "auto", paddingRight: 8 } }}
      >
        <Form layout="vertical" form={form} onFinish={submit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select options={categories.map((c) => ({ value: c._id, label: c.name }))} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="offer" label="Offer">
            <Select allowClear options={offers.map((o) => ({ value: o._id, label: o.title }))} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          {!activeImageSrc ? (
            <Form.Item label="Image">
              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  setFile(info.fileList?.[0]?.originFileObj || null);
                  setIsCurrentImageRemoved(false);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <div className="admin-clickable-image admin-clickable-image--modal" onClick={() => openViewer(activeImageSrc)}>
                <img src={activeImageSrc} alt="Product preview" />
                <div className="admin-clickable-image__overlay">
                  <EyeOutlined />
                </div>
                <Button
                  type="text"
                  className="admin-image-remove-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFile(null);
                    setImagePreview("");
                    setIsCurrentImageRemoved(true);
                  }}
                >
                  x
                </Button>
              </div>
            </div>
          )}
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
      <Modal
        open={viewer.open}
        title="Image Preview"
        footer={null}
        onCancel={() => setViewer({ open: false, src: "" })}
        width={720}
        centered
        zIndex={2100}
        styles={{ body: { height: "68vh", overflowY: "auto", display: "grid", placeItems: "center" } }}
        destroyOnClose
      >
        {viewer.src ? (
          <img
            src={viewer.src}
            alt="Preview"
            style={{ width: "100%", maxHeight: "62vh", objectFit: "contain" }}
          />
        ) : null}
      </Modal>
    </motion.div>
  );
}

export default ProductsPage;
