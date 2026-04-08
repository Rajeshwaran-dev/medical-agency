import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  DashboardOutlined,
  GiftOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("/admin/products")) return "products";
    if (location.pathname.includes("/admin/categories")) return "categories";
    if (location.pathname.includes("/admin/offers")) return "offers";
    return "dashboard";
  }, [location.pathname]);

  return (
    <Layout className="admin-dashboard" hasSider style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        collapsedWidth={80}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #041a3b 0%, #00152e 45%, #001025 100%)",
          borderInlineEnd: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "10px 0 30px rgba(0, 9, 25, 0.28)"
        }}
      >
        <div
          style={{
            height: 74,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            fontSize: collapsed ? 16 : 22,
            letterSpacing: 0.2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))"
          }}
        >
          {collapsed ? "MA" : "Medical Admin"}
        </div>
        <Menu
          className="admin-sidebar-menu"
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            marginTop: 10,
            background: "transparent",
            borderInlineEnd: "none",
            paddingInline: 8
          }}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>
            },
            {
              key: "products",
              icon: <AppstoreOutlined />,
              label: <Link to="/admin/products">Products</Link>
            },
            {
              key: "categories",
              icon: <AppstoreOutlined />,
              label: <Link to="/admin/categories">Categories</Link>
            },
            { key: "offers", icon: <GiftOutlined />, label: <Link to="/admin/offers">Offers</Link> }
          ]}
        />
      </Sider>
      <Layout style={{ minWidth: 0 }}>
        <Header style={{ background: "#fff", paddingInline: 16 }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((prev) => !prev)}
            />
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{
                items: [
                  {
                    key: "admin-label",
                    label: <Typography.Text strong>Admin</Typography.Text>,
                    disabled: true
                  },
                  {
                    type: "divider"
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    danger: true,
                    onClick: handleLogout
                  }
                ]
              }}
            >
              <Button type="text" icon={<UserOutlined style={{ fontSize: 18 }} />} />
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
