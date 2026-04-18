import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message,
  Divider,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { adminApi } from "../services/api";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      const { data } = await adminApi.put("/auth/profile", values);
      if (data.success) {
        message.success(data.message || "Profile updated successfully");
        const updatedUser = { ...user, ...data.data };
        localStorage.setItem("adminUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    setPasswordLoading(true);
    try {
      const { data } = await adminApi.put("/auth/change-password", values);
      if (data.success) {
        message.success(data.message || "Password changed successfully");
        passwordForm.resetFields();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Profile Information
              </Title>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={{
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
              }}
              onFinish={handleUpdateProfile}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ borderRadius: "6px" }}
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Security
              </Title>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <Text type="secondary">Change your account password below.</Text>
            <Divider />
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handleChangePassword}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: "Please enter current password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="New password" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={passwordLoading}
                  danger
                  style={{ borderRadius: "6px" }}
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
