import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table } from "antd";
import toast from "react-hot-toast";
import { adminApi } from "../services/api";

function OffersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/offers");
      setItems(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(
    () => items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const submit = async (values) => {
    try {
      if (editing) await adminApi.put(`/offers/${editing._id}`, values);
      else await adminApi.post("/offers", values);
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
      await adminApi.delete(`/offers/${id}`);
      toast.success("Deleted");
      fetchItems();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Space style={{ marginBottom: 12 }}>
        <Input.Search placeholder="Search offer" onSearch={setSearch} allowClear />
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add Offer
        </Button>
      </Space>
      <Table
        loading={loading}
        style={{ fontSize: 16 }}
        dataSource={filtered}
        rowKey="_id"
        pagination={{ pageSize: 8 }}
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Discount %", dataIndex: "discountPercentage" },
          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    form.setFieldsValue(record);
                    setOpen(true);
                  }}
                  icon={<EditOutlined />}
                />
                <Popconfirm title="Delete offer?" onConfirm={() => remove(record._id)}>
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
      <Modal
        open={open}
        title={editing ? "Edit Offer" : "Add Offer"}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        styles={{ body: { height: "68vh", overflowY: "auto", paddingRight: 8 } }}
      >
        <Form layout="vertical" form={form} onFinish={submit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discountPercentage" label="Discount %" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </motion.div>
  );
}

export default OffersPage;
