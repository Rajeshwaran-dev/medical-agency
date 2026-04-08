import { motion } from "framer-motion";

function ProductCard({ product }) {
  const discount = product.offer?.discountPercentage || 0;

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative overflow-hidden rounded-xl bg-slate-100">
        <img
          src={product.image || "https://placehold.co/600x400/e2e8f0/334155?text=Medical+Product"}
          alt={product.name}
          className="h-44 w-full object-cover"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-800">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-700">${Number(product.price).toFixed(2)}</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {product.category?.name || "General"}
        </span>
      </div>
    </motion.article>
  );
}

export default ProductCard;
