import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

const MOBILE_MAX = 991;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  background: "linear-gradient(180deg, #041a3b 0%, #00152e 45%, #001025 100%)",
  borderInlineEnd: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "10px 0 30px rgba(0, 9, 25, 0.28)",
};

const drawerBodyBg =
  "linear-gradient(180deg, #041a3b 0%, #00152e 45%, #001025 100%)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_MAX : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isMobile;
}

function AdminLayout() {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  const handleLogout = () => {
    closeDrawer();
    logout();
    navigate("/admin/login");
  };

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("/admin/products")) return "products";
    if (location.pathname.includes("/admin/categories")) return "categories";
    if (location.pathname.includes("/admin/leads")) return "leads";
    if (location.pathname.includes("/admin/profile")) return "profile";
    return "dashboard";
  }, [location.pathname]);

  const menuItems = useMemo(
    () => [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: (
          <Link to="/admin" onClick={closeDrawer}>
            Dashboard
          </Link>
        ),
      },
      {
        key: "products",
        icon: <AppstoreOutlined />,
        label: (
          <Link to="/admin/products" onClick={closeDrawer}>
            Products
          </Link>
        ),
      },
      {
        key: "categories",
        icon: <AppstoreOutlined />,
        label: (
          <Link to="/admin/categories" onClick={closeDrawer}>
            Categories
          </Link>
        ),
      },
      {
        key: "leads",
        icon: <TeamOutlined />,
        label: (
          <Link to="/admin/leads" onClick={closeDrawer}>
            Leads
          </Link>
        ),
      },
      {
        key: "profile",
        icon: <UserOutlined />,
        label: (
          <Link to="/admin/profile" onClick={closeDrawer}>
            Profile
          </Link>
        ),
      },
    ],
    [closeDrawer],
  );

  const sidebarHeader = (logoSize) => (
    <div
      style={{
        height: 74,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
      }}
    >
      <img
        src="/logo.png"
        alt="Medical Agency"
        style={{
          width: logoSize,
          height: logoSize,
          objectFit: "contain",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
    </div>
  );

  const menuBlock = (paddingInline) => (
    <Menu
      className="admin-sidebar-menu"
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      style={{
        marginTop: 10,
        background: "transparent",
        borderInlineEnd: "none",
        paddingInline,
      }}
      items={menuItems}
    />
  );

  return (
    <Layout className="admin-dashboard" style={{ minHeight: "100vh" }}>
      {!isMobile ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          collapsedWidth={80}
          style={siderStyle}
        >
          {sidebarHeader(collapsed ? 38 : 54)}
          {menuBlock(8)}
        </Sider>
      ) : null}

      <Layout style={{ minWidth: 0 }}>
        <Header
          style={{
            background: "#fff",
            paddingInline: isMobile ? 10 : 16,
            height: 56,
            lineHeight: "56px",
            position: "sticky",
            top: 0,
            zIndex: 20,
            boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          }}
        >
          <Space style={{ width: "100%", justifyContent: "space-between" }} align="center" size="middle">
            <Button
              type="text"
              size="large"
              style={{ minWidth: 44, minHeight: 44 }}
              icon={
                isMobile ? (
                  <MenuUnfoldOutlined style={{ fontSize: 18 }} />
                ) : collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: 18 }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: 18 }} />
                )
              }
              onClick={() => {
                if (isMobile) setDrawerOpen(true);
                else setCollapsed((prev) => !prev);
              }}
              aria-label={isMobile ? "Open menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
            />
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{
                items: [
                  {
                    key: "admin-label",
                    label: <Typography.Text strong>Admin</Typography.Text>,
                    disabled: true,
                  },
                  { type: "divider" },
                  {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: "Profile",
                    onClick: () => navigate("/admin/profile"),
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    danger: true,
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <Button
                type="text"
                size="large"
                style={{ minWidth: 44, minHeight: 44 }}
                icon={<UserOutlined style={{ fontSize: 18 }} />}
                aria-label="Account menu"
              />
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: isMobile ? 10 : 16,
            minWidth: 0,
            maxWidth: "100%",
            overflowX: "auto",
            paddingBottom: isMobile ? 16 : 0,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <Drawer
        rootClassName="admin-mobile-drawer"
        placement="left"
        width={typeof window !== "undefined" ? Math.min(300, window.innerWidth - 16) : 280}
        open={isMobile && drawerOpen}
        onClose={closeDrawer}
        destroyOnClose
        title={<span style={{ color: "#fff", fontWeight: 600 }}>Menu</span>}
        styles={{
          body: { padding: 0, background: drawerBodyBg },
          header: {
            background: "#041a3b",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            padding: "12px 16px",
          },
          content: { background: drawerBodyBg },
          mask: { backdropFilter: "blur(2px)" },
        }}
      >
        {sidebarHeader(48)}
        {menuBlock(10)}
      </Drawer>
    </Layout>
  );
}

export default AdminLayout;
