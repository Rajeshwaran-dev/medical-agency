import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftOutlined,
  LeftOutlined,
  PhoneOutlined,
  RightOutlined,
  TagOutlined,
  WhatsAppOutlined
} from "@ant-design/icons";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { publicApi } from "../services/api";

import productPlaceholder from "../assets/images/product-placeholder.svg";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);


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


  const galleryImages = (() => {
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    if (product?.image) return [product.image];
    return [productPlaceholder];
  })();
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];
  const specs = Array.isArray(product?.specs)
    ? product.specs.filter((item) => item?.label && item?.value)
    : [];
  const rawDescription = (product?.description || "").trim();
  const descriptionParagraphs = rawDescription
    ? rawDescription.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [];
  /** First block before pricing; rest after pricing as “detailed” when separated by a blank line in admin. */
  const introText =
    descriptionParagraphs.length > 1
      ? descriptionParagraphs[0]
      : rawDescription;
  const detailText =
    descriptionParagraphs.length > 1
      ? descriptionParagraphs.slice(1).join("\n\n")
      : "";

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="h-9 w-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton />
          <div className="space-y-3">
            <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-20 w-full animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-10">
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-7xl space-y-8 px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pt-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeftOutlined className="text-xs" />
          Back to Products
        </Link>
      </div>

      {/* Left: sticky gallery | Right: scrolls (title → intro → pricing → detail → enquire → specs) */}
      <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:z-10 lg:w-[min(100%,440px)] lg:max-w-[45%] lg:self-start">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4">
            <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[min(280px,42vh)] min-h-[200px] w-full object-cover sm:max-h-[360px] lg:max-h-[min(420px,calc(100vh-8rem))]"
              />
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                    }
                    className="absolute left-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-slate-900/75 text-sm shadow-md backdrop-blur-[2px] text-white [&_.anticon]:text-white [&_svg]:fill-white [&_svg]:text-white"
                    aria-label="Previous image"
                  >
                    <LeftOutlined className="text-[15px] text-white" style={{ color: "#ffffff" }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                    className="absolute right-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-slate-900/75 text-sm shadow-md backdrop-blur-[2px] text-white [&_.anticon]:text-white [&_svg]:fill-white [&_svg]:text-white"
                    aria-label="Next image"
                  >
                    <RightOutlined className="text-[15px] text-white" style={{ color: "#ffffff" }} />
                  </button>
                </>
              )}
            </div>
            {galleryImages.length > 1 ? (
              <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-5 sm:gap-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-lg border transition ${
                      index === activeImageIndex
                        ? "border-teal-500 ring-2 ring-teal-100"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="h-14 w-full object-cover sm:h-[3.75rem]"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-6 lg:pt-0">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                {product.category?.name || "General"}
              </span>

            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.65rem]">
              {product.name}
            </h1>
            {introText ? (
              <p className="mt-3 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-7 whitespace-pre-line">
                {introText}
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-400">No description available.</p>
            )}
          </div>



          {detailText ? (
            <div>
              <h2 className="border-b border-slate-100 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Detailed description
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-7 whitespace-pre-line">
                {detailText}
              </p>
            </div>
          ) : null}

          <div>
            <h2 className="border-b border-slate-100 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Specifications
            </h2>
            {specs.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No additional specifications listed.</p>
            ) : (
              <div className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
                {specs.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className="grid gap-0.5 bg-white px-3 py-2.5 sm:grid-cols-[minmax(0,140px)_1fr] sm:px-4"
                  >
                    <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                    <span className="text-sm text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/917092555030?text=${encodeURIComponent(`I'm interested in your product: ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-green-700/25 transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:w-auto sm:min-w-[200px]"
            >
              <WhatsAppOutlined className="text-lg" />
              Chat with us
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">Related products</h2>
        {relatedProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center text-sm text-slate-500">
            No related products in this category.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>


    </motion.div>
  );
}

export default ProductDetailsPage;
