import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { publicApi } from "../services/api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          publicApi.get("/products", { params: { limit: 24 } }),
          publicApi.get("/categories")
        ]);
        setProducts(productsRes.data.data || []);
        setCategories(categoriesRes.data.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((item) => item.category?._id === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Products</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Healthcare Products You Can Rely On</h1>
        <p className="mt-3 max-w-2xl text-blue-50">
          Browse essentials curated to support daily wellness and professional care.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-4">
        <h2 className="text-xl font-bold text-slate-800">All Products</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => <LoadingSkeleton key={idx} />)
          : filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </motion.div>
  );
}

export default ProductsPage;
