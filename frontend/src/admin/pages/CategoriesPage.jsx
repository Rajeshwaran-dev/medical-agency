import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import toast from "react-hot-toast";
import { adminApi } from "../services/api";

function CategoriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/categories");
      setItems(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(
    () => items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const submit = async (values) => {
    try {
      if (editing) await adminApi.put(`/categories/${editing._id}`, values);
      else await adminApi.post("/categories", values);
      toast.success("Saved successfully");
      setOpen(false);
      setEditing(null);
      form.resetFields();
      fetchItems();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Save failed");
    }
  };

  const remove = async (id) => {
    try {
      await adminApi.delete(`/categories/${id}`);
      toast.success("Deleted");
      fetchItems();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Space style={{ marginBottom: 12 }}>
        <Input.Search placeholder="Search category" onSearch={setSearch} allowClear />
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </Space>
      <Table
        loading={loading}
        style={{ fontSize: 16 }}
        dataSource={filtered}
        rowKey="_id"
        pagination={{ pageSize: 8 }}
        columns={[
          { title: "Name", dataIndex: "name" },
          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    form.setFieldsValue({ name: record.name });
                    setOpen(true);
                  }}
                  icon={<EditOutlined />}
                />
                <Popconfirm title="Delete category?" onConfirm={() => remove(record._id)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
      <Modal
        open={open}
        title={editing ? "Edit Category" : "Add Category"}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        styles={{ body: { height: "68vh", overflowY: "auto", paddingRight: 8 } }}
      >
        <Form layout="vertical" form={form} onFinish={submit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </motion.div>
  );
}

export default CategoriesPage;
