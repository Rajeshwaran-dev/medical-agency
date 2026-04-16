import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightOutlined, HomeOutlined } from "@ant-design/icons";
import Breadcrumbs from "../components/Breadcrumbs";

function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4"
    >
      <div className="w-full max-w-7xl">
        <Breadcrumbs />
      </div>
      <div className="relative">
        {/* Decorative background ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full border-2 border-dashed border-teal-200 animate-spin" style={{ animationDuration: "20s" }} />
        </div>
        <div className="relative z-10 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-400 leading-none pb-2">
          404
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">Page Not Found</h2>
      <p className="mt-2 max-w-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-200 transition hover:-translate-y-0.5 hover:bg-teal-700"
        >
          <HomeOutlined /> Go Home
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Browse Products <ArrowRightOutlined className="text-xs" />
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFoundPage;