import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
  TagOutlined
} from "@ant-design/icons";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { publicApi } from "../services/api";
import LeadEnquiryModal from "../components/LeadEnquiryModal";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const productRes = await publicApi.get(`/products/${id}`);
        const productData = productRes.data.data;
        setProduct(productData);
        setActiveImageIndex(0);

        if (productData?.category?._id) {
          const relatedRes = await publicApi.get("/products", {
            params: {
              category: productData.category._id,
              limit: 8,
            },
          });

          const related = (relatedRes.data.data || [])
            .filter((item) => item._id !== productData._id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setRelatedProducts([]);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [id]);

  const discount = product?.offer?.discountPercentage || 0;
  const basePrice = Number(product?.price || 0);
  const discountedPrice = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
  const galleryImages = (() => {
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    if (product?.image) return [product.image];
    return ["https://placehold.co/900x650/e2e8f0/334155?text=Medical+Product"];
  })();
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];
  const specs = Array.isArray(product?.specs)
    ? product.specs.filter((item) => item?.label && item?.value)
    : [];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-8 lg:grid-cols-2">
          <LoadingSkeleton />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
          <p className="mt-2 text-slate-500">
            The product you are looking for does not exist or may have been removed.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeftOutlined />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl space-y-10 px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeftOutlined />
          Back to Products
        </Link>
      </div>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <img src={activeImage} alt={product.name} className="h-[420px] w-full object-cover" />
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-slate-900/70 text-white"
                  aria-label="Previous image"
                >
                  <LeftOutlined />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-slate-900/70 text-white"
                  aria-label="Next image"
                >
                  <RightOutlined />
                </button>
              </>
            )}
          </div>
          {galleryImages.length > 1 ? (
            <div className="grid grid-cols-5 gap-2">
              {galleryImages.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-xl border ${
                    index === activeImageIndex ? "border-teal-500 ring-2 ring-teal-200" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="h-16 w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {product.category?.name || "General"}
            </span>
            {discount > 0 && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {discount}% OFF
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {product.description || "No description available."}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Price</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-blue-700">${discountedPrice.toFixed(2)}</span>
                {discount > 0 ? (
                  <div className="text-sm text-slate-400 line-through">${basePrice.toFixed(2)}</div>
                ) : null}
              </div>
            </div>
            {product.offer?.title && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <TagOutlined className="text-teal-600" />
                Offer: <span className="font-semibold">{product.offer.title}</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Enquire Now
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Product Information</h2>
        {specs.length === 0 ? (
          <p className="mt-3 text-slate-500">No additional product details available.</p>
        ) : (
          <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100">
            {specs.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="grid gap-2 bg-white px-4 py-3 md:grid-cols-[240px_1fr] md:px-5"
              >
                <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                <span className="text-sm text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
        {relatedProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
            No related products found in this category.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>

      <LeadEnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        onSuccess={() => toast.success("Enquiry submitted for this product")}
        title="Product Enquiry"
        subtitle="Submit your requirement for this product and we will contact you shortly."
        initialSubject={`Enquiry for ${product.name}`}
        productId={product._id}
      />
    </motion.div>
  );
}

export default ProductDetailsPage;
