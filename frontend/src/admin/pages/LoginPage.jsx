import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      toast.success("Login successful");
      navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 20,
        background:
          "radial-gradient(circle at 15% 15%, rgba(34, 142, 255, 0.35), transparent 35%), radial-gradient(circle at 85% 20%, rgba(44, 208, 190, 0.35), transparent 35%), linear-gradient(135deg, #0b1f4d 0%, #0f3b82 45%, #1e66d0 100%)"
      }}
    >
      <Card
        style={{
          width: 430,
          maxWidth: "100%",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow: "0 22px 48px rgba(0, 22, 64, 0.32)",
          background:
            "radial-gradient(circle at 8% 10%, rgba(37, 119, 255, 0.13), transparent 28%), radial-gradient(circle at 92% 88%, rgba(25, 197, 181, 0.12), transparent 30%), linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(245,249,255,0.96) 100%)",
          backdropFilter: "blur(8px)",
          position: "relative",
          overflow: "hidden"
        }}
        styles={{ body: { padding: 28 } }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 140,
            height: 140,
            borderRadius: "0 18px 0 100%",
            background: "linear-gradient(135deg, rgba(53,137,255,0.22), rgba(53,137,255,0.03))",
            pointerEvents: "none"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 120,
            height: 120,
            borderRadius: "0 100% 0 18px",
            background: "linear-gradient(315deg, rgba(25,197,181,0.16), rgba(25,197,181,0.02))",
            pointerEvents: "none"
          }}
        />
        <div
          style={{
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Welcome Admin
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 15 }}>
              Sign in to manage products, categories, and offers.
            </Typography.Text>
          </div>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input
              size="large"
              placeholder="admin@medicalagency.com"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="Enter password" style={{ borderRadius: 10 }} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{
              borderRadius: 10,
              height: 44,
              fontWeight: 600,
              boxShadow: "0 10px 20px rgba(24, 116, 255, 0.28)"
            }}
          >
            Sign In
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
