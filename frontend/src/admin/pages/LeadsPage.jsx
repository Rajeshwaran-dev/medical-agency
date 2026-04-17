import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { adminApi } from "../services/api";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedLead, setSelectedLead] = useState(null);
  const [form] = Form.useForm();

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/leads");
      setLeads(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLead(null);
    form.resetFields();
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedLead(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openViewModal = async (lead) => {
    setModalMode("view");
    setModalOpen(true);
    const res = await adminApi.get(`/leads/${lead._id}`);
    setSelectedLead(res.data.data);
  };

  const openEditModal = async (lead) => {
    setModalMode("edit");
    const res = await adminApi.get(`/leads/${lead._id}`);
    const fullLead = res.data.data;
    setSelectedLead(fullLead);
    form.setFieldsValue({
      name: fullLead.name,
      email: fullLead.email,
      phone: fullLead.phone,
      organization: fullLead.organization,
      subject: fullLead.subject,
      message: fullLead.message,
    });
    setModalOpen(true);
  };

  const handleDelete = async (leadId) => {
    await adminApi.delete(`/leads/${leadId}`);
    message.success("Lead deleted successfully");
    await loadLeads();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setSaving(true);
    try {
      if (modalMode === "create") {
        await adminApi.post("/leads/manual", values);
        message.success("Lead added successfully");
      } else {
        await adminApi.put(`/leads/${selectedLead._id}`, values);
        message.success("Lead updated successfully");
      }
      closeModal();
      await loadLeads();
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (text) => text || "-",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => text || "-",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (value) => {
        if (value === "Manual") return <Tag color="purple">Manual</Tag>;
        if (value === "Product") return <Tag color="gold">Product</Tag>;
        return <Tag color="cyan">Website</Tag>;
      },
    },
    {
      title: "Product",
      key: "product",
      render: (_, row) =>
        row.source === "Product" && row.product?.name ? (
          <Space>
            <Avatar
              shape="square"
              size={34}
              src={row.product?.image || undefined}
              style={{ backgroundColor: "#f1f5f9" }}
            >
              {(row.product?.name || "P")[0]}
            </Avatar>
            <span>{row.product?.name}</span>
          </Space>
        ) : (
          "-"
        ),
    },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="blue">New</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <Space size="small">
          <Button
            size="small"
            aria-label="View lead"
            icon={<EyeOutlined />}
            onClick={() => openViewModal(row)}
          />
          <Button
            size="small"
            type="primary"
            ghost
            aria-label="Edit lead"
            icon={<EditOutlined />}
            onClick={() => openEditModal(row)}
          />
          <Popconfirm
            title="Delete this lead?"
            description="This action cannot be undone."
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(row._id)}
          >
            <Button size="small" danger aria-label="Delete lead" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Leads
          </Typography.Title>
        }
        extra={
          <Button type="primary" onClick={openCreateModal}>
            Add Lead
          </Button>
        }
        style={{ borderRadius: 18 }}
      />

      <Card
        style={{ borderRadius: 18, minHeight: 320 }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={leads}
          columns={columns}
          pagination={{ pageSize: 8 }}
          locale={{ emptyText: <Empty description="No leads yet" /> }}
        />
      </Card>

      <Modal
        open={modalOpen}
        title={
          modalMode === "create"
            ? "Add Manual Lead"
            : modalMode === "edit"
              ? "Edit Lead"
              : "Lead Details"
        }
        onCancel={closeModal}
        onOk={modalMode === "view" ? closeModal : handleSubmit}
        okText={modalMode === "view" ? "Close" : modalMode === "create" ? "Add Lead" : "Save Changes"}
        confirmLoading={saving}
        centered
        width={760}
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
          paddingRight: 8,
        }}
        destroyOnClose
      >
        {modalMode === "view" ? (
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Name">{selectedLead?.name || "-"}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedLead?.email || "-"}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedLead?.phone || "-"}</Descriptions.Item>
            <Descriptions.Item label="Organization">
              {selectedLead?.organization || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Subject">{selectedLead?.subject || "-"}</Descriptions.Item>
            <Descriptions.Item label="Message">{selectedLead?.message || "-"}</Descriptions.Item>
            <Descriptions.Item label="Source">{selectedLead?.source || "-"}</Descriptions.Item>
            <Descriptions.Item label="Product">
              {selectedLead?.source === "Product" && selectedLead?.product?.name
                ? selectedLead.product.name
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Submitted">
              {selectedLead?.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "-"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="example@company.com" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone is required" }]}>
              <Input placeholder="+91 12345 67890" />
            </Form.Item>
            <Form.Item name="organization" label="Organization">
              <Input placeholder="Hospital / Clinic name" />
            </Form.Item>
            <Form.Item name="subject" label="Subject">
              <Input placeholder="Medicine or requirement" />
            </Form.Item>
            <Form.Item name="message" label="Message">
              <Input.TextArea rows={4} placeholder="Additional notes" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default LeadsPage;
