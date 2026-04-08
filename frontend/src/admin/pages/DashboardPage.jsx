import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppstoreOutlined, GiftOutlined, TagsOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Row, Spin, Table, Tag } from "antd";
import { adminApi } from "../services/api";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      const res = await adminApi.get("/dashboard/stats");
      setStats(res.data.data);
    };

    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await adminApi.get("/products", { params: { page: 1, limit: 100 } });
        setProducts(res.data.data || []);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadStats();
    loadProducts();
  }, []);

  if (!stats) return <Spin />;

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      color: "#1677ff",
      icon: <AppstoreOutlined style={{ fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #0f5bd9 0%, #4f8ef7 100%)"
    },
    {
      label: "Total Categories",
      value: stats.totalCategories,
      color: "#13c2c2",
      icon: <TagsOutlined style={{ fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #0d9d9d 0%, #44d2c7 100%)"
    },
    {
      label: "Total Offers",
      value: stats.totalOffers,
      color: "#52c41a",
      icon: <GiftOutlined style={{ fontSize: 22 }} />,
      gradient: "linear-gradient(135deg, #3ca314 0%, #7fd63e 100%)"
    }
  ];

  const maxCount = Math.max(stats.totalProducts, stats.totalCategories, stats.totalOffers, 1);
  const todayDateText = new Date().toDateString();
  const todayProducts = products.filter((item) => {
    if (!item.createdAt) return false;
    return new Date(item.createdAt).toDateString() === todayDateText;
  });

  const chartItems = [
    { key: "products", label: "Products", value: stats.totalProducts, color: "#1677ff" },
    { key: "categories", label: "Categories", value: stats.totalCategories, color: "#13c2c2" },
    { key: "offers", label: "Offers", value: stats.totalOffers, color: "#52c41a" }
  ];

  const totalCount = stats.totalProducts + stats.totalCategories + stats.totalOffers;
  const sectionGap = 20;

  return (
    <div
      className="admin-dashboard-page"
      style={{
        padding: 20,
        borderRadius: 20,
        background:
          "radial-gradient(circle at 10% 0%, rgba(22,119,255,0.12), transparent 35%), radial-gradient(circle at 90% 30%, rgba(19,194,194,0.12), transparent 35%), #f7f9fc",
        display: "flex",
        flexDirection: "column",
        gap: sectionGap
      }}
    >
      <Card
        style={{
          borderRadius: 18,
          border: "1px solid #e8eef8",
          background: "linear-gradient(135deg, #0a1f44 0%, #123b7a 60%, #1f6fd9 100%)",
          color: "#fff",
          boxShadow: "0 16px 35px rgba(17,55,112,0.28)"
        }}
        styles={{ body: { padding: 24 } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, color: "#fff" }}>Medical Agency Insights</h2>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.85)" }}>
              Real-time summary of products, categories, and offers.
            </p>
          </div>
          <div
            style={{
              minWidth: 150,
              textAlign: "center",
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.24)"
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Total Entities</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{totalCount}</div>
          </div>
        </div>
      </Card>

      <Row gutter={[sectionGap, sectionGap]}>
        {cards.map((item, index) => (
          <Col key={item.label} xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card
                style={{
                  borderRadius: 16,
                  border: "none",
                  overflow: "hidden",
                  boxShadow: "0 14px 28px rgba(16, 34, 70, 0.16)",
                  background: item.gradient,
                  color: "#fff",
                  position: "relative"
                }}
                styles={{ body: { padding: 20 } }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -28,
                    top: -28,
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)"
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        letterSpacing: 0.3,
                        color: "rgba(255,255,255,0.9)"
                      }}
                    >
                      {item.label}
                    </p>
                    <h2 style={{ margin: "8px 0 0", color: "#fff", fontSize: 38, lineHeight: 1.05 }}>
                      {item.value}
                    </h2>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(255,255,255,0.16)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      backdropFilter: "blur(4px)"
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    height: 4,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.32)"
                  }}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.92)"
                  }}
                >
                  Updated live from inventory data
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row gutter={[sectionGap, sectionGap]}>
        <Col xs={24} md={12}>
          <Card
            title="Posting Overview"
            style={{
              borderRadius: 16,
              boxShadow: "0 12px 28px rgba(13,39,80,0.08)",
              border: "1px solid #edf2fa",
              height: "100%"
            }}
            styles={{ body: { padding: "14px 18px 18px" } }}
          >
            <div style={{ marginBottom: 10 }}>
              <Tag color="green">Offers Posted: {stats.totalOffers}</Tag>
              <Tag color="blue">Products Created: {stats.totalProducts}</Tag>
            </div>
            {chartItems.map((item) => {
              const widthPercent = Math.max((item.value / maxCount) * 100, item.value > 0 ? 10 : 0);
              return (
                <div key={item.key} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 16 }}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div style={{ width: "100%", height: 10, borderRadius: 999, background: "#f1f3f5" }}>
                    <div
                      style={{
                        width: `${widthPercent}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}bb)`,
                        transition: "width 0.4s ease"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Distribution Chart"
            style={{
              borderRadius: 16,
              boxShadow: "0 12px 28px rgba(13,39,80,0.08)",
              border: "1px solid #edf2fa",
              height: "100%"
            }}
            styles={{ body: { padding: "16px 18px 18px" } }}
          >
            <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
              <div
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: "50%",
                  background: `conic-gradient(
                    #1677ff 0deg ${(stats.totalProducts / Math.max(totalCount, 1)) * 360}deg,
                    #13c2c2 ${(stats.totalProducts / Math.max(totalCount, 1)) * 360}deg ${((stats.totalProducts + stats.totalCategories) / Math.max(totalCount, 1)) * 360}deg,
                    #52c41a ${((stats.totalProducts + stats.totalCategories) / Math.max(totalCount, 1)) * 360}deg 360deg
                  )`,
                  position: "relative",
                  marginInline: "auto"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 18,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center"
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, color: "#6b778c" }}>Total</div>
                    <div style={{ fontWeight: 700, fontSize: 26 }}>{totalCount}</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 10 }}>
                {chartItems.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: 10,
                      background: "#f6f9ff"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 99,
                          background: item.color,
                          display: "inline-block"
                        }}
                      />
                      {item.label}
                    </span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Today Products"
        style={{
          borderRadius: 16,
          boxShadow: "0 12px 28px rgba(13,39,80,0.08)",
          border: "1px solid #edf2fa"
        }}
        styles={{ body: { padding: "10px 14px 14px" } }}
      >
        <Table
          loading={loadingProducts}
          size="middle"
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          style={{ fontSize: 16 }}
          dataSource={todayProducts}
          locale={{ emptyText: <Empty description="No products added today" /> }}
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Category", render: (_, row) => row.category?.name || "-" },
            { title: "Price", render: (_, row) => `$${Number(row.price || 0).toFixed(2)}` },
            {
              title: "Added At",
              render: (_, row) =>
                row.createdAt ? new Date(row.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-"
            }
          ]}
        />
      </Card>
    </div>
  );
}

export default DashboardPage;
