import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import productPlaceholder from "../assets/images/product-placeholder.svg";

function ProductCard({ product }) {
  const regularPrice = Number(product.regularPrice ?? product.price ?? 0);
  const offerPriceRaw = product.offerPrice;
  const hasOfferPrice =
    offerPriceRaw !== null &&
    offerPriceRaw !== undefined &&
    offerPriceRaw !== "" &&
    Number(offerPriceRaw) > 0;
  const finalPrice = hasOfferPrice ? Number(offerPriceRaw) : regularPrice;
  const showStrikethrough = hasOfferPrice && Number(offerPriceRaw) !== regularPrice;
  const priceDropPercent =
    showStrikethrough && regularPrice > 0
      ? Math.round(((regularPrice - finalPrice) / regularPrice) * 100)
      : 0;
  const previewImage =
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image) ||
    productPlaceholder;

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-slate-100">
          <img
            src={previewImage}
            alt={product.name}
            className="h-44 w-full object-cover"
          />
          {priceDropPercent > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
              {priceDropPercent}% OFF
            </span>
          )}
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-800">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-700">${finalPrice.toFixed(2)}</span>
            {showStrikethrough ? (
              <span className="text-xs text-slate-400 line-through">${regularPrice.toFixed(2)}</span>
            ) : null}
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {product.category?.name || "General"}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProductCard;
