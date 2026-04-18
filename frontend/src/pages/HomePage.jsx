import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import SectionHeading from "../components/SectionHeading";
import LeadEnquiryModal from "../components/LeadEnquiryModal";
import heroSlide1 from "../assets/images/hero-slide-1.jpg";
import heroSlide2 from "../assets/images/hero-slide-2.jpg";
import heroSlide3 from "../assets/images/hero-slide-3.jpg";
import aboutPreviewImage from "../assets/images/about-preview.jpg";

const stats = [
  { value: "24+", label: "Years of Trust" },
  { value: "500+", label: "Products Available" },
  { value: "1000+", label: "Healthcare Clients" },
  { value: "24/7", label: "Emergency Support" },
];

const specialties = [
  { name: "Anaesthesia", emoji: "💉", shade: "blue" },
  { name: "Critical Care", emoji: "🏥", shade: "red" },
  { name: "Oncology Drugs", emoji: "🔬", shade: "purple" },
  { name: "Nephrology", emoji: "🫁", shade: "teal" },
  { name: "Transplant Drugs", emoji: "🫀", shade: "rose" },
  { name: "Immunoglobulins", emoji: "🧬", shade: "indigo" },
  { name: "Vaccines", emoji: "🩹", shade: "green" },
  { name: "Gynaecology", emoji: "🩺", shade: "pink" },
  { name: "HIV Antivirals", emoji: "🛡️", shade: "orange" },
  { name: "Cardiac Products", emoji: "❤️", shade: "red" },
  { name: "Neuro Products", emoji: "🧠", shade: "cyan" },
  { name: "Imported Drugs", emoji: "✈️", shade: "sky" },
];

const shadeMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  red: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  purple: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  teal: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
  rose: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
  green: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  pink: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
  orange: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
  sky: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
};

const services = [
  {
    title: "Certified Products",
    description:
      "All pharmaceuticals are certified and quality-checked from approved manufacturers with proper documentation.",
    icon: <SafetyCertificateOutlined />,
    iconBg: "bg-teal-100 text-teal-700",
    accent: "border-t-teal-500",
  },
  {
    title: "Fast Delivery",
    description:
      "Quick and secure delivery network serving hospitals, clinics, and pharmacies across the region.",
    icon: <TruckOutlined />,
    iconBg: "bg-blue-100 text-blue-700",
    accent: "border-t-blue-500",
  },
  {
    title: "Trusted Partners",
    description:
      "We work with leading pharmaceutical companies to ensure consistent quality and reliability.",
    icon: <CheckCircleOutlined />,
    iconBg: "bg-indigo-100 text-indigo-700",
    accent: "border-t-indigo-500",
  },
  {
    title: "24/7 Emergency",
    description:
      "Round-the-clock emergency support for critical care medicines when patients need them most.",
    icon: <ClockCircleOutlined />,
    iconBg: "bg-amber-100 text-amber-700",
    accent: "border-t-amber-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const heroSlides = [
  {
    title: (
      <>
        Trusted Specialty <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
          Healthcare Solutions
        </span>
      </>
    ),
    description:
      "We supply certified specialty medicines — Oncology, Critical Care, Anaesthesia, and more — to hospitals across Tamil Nadu with speed and reliability.",
    image: heroSlide1,
    cta: "Browse Products",
    ctaLink: "/products",
  },
  {
    title: (
      <>
        Reliable & Secure <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
          Medical Supply Chain
        </span>
      </>
    ),
    description:
      "Ensuring cold chain maintenance and quality assurance for life-saving drugs from approved manufacturers directly to your facility.",
    image: heroSlide2,
    cta: "Our Services",
    ctaLink: "/services",
  },
  {
    title: (
      <>
        24/7 Emergency <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
          Healthcare Support
        </span>
      </>
    ),
    description:
      "Round-the-clock support for critical care medicines when every second counts. Dedicated to serving Madurai and beyond for 24+ years.",
    image: heroSlide3,
    cta: "Contact Us",
    ctaLink: "/contact",
  },
];

function HomePage() {
  const [leadModalOpen, setLeadModalOpen] = useState(true);
  const [leadSuccess, setLeadSuccess] = useState("");

  useEffect(() => {
    setLeadModalOpen(true);
  }, []);

  useEffect(() => {
    if (!leadSuccess) return undefined;

    const timer = setTimeout(() => {
      setLeadSuccess("");
    }, 2600);

    return () => clearTimeout(timer);
  }, [leadSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-20"
    >
      <LeadEnquiryModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSuccess={(msg) => setLeadSuccess(msg)}
      />

      {leadSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed left-1/2 top-8 z-[80] w-[92%] max-w-md -translate-x-1/2"
        >
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-[0_20px_45px_-20px_rgba(5,150,105,0.45)] ring-1 ring-emerald-100">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircleOutlined className="text-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Enquiry Submitted Successfully
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Thank you! Our team will contact you shortly.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {/* ── HERO SLIDER ── */}
      <section className="relative group overflow-hidden bg-slate-900 shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          loop={true}
          className="h-[calc(100vh-112px)] min-h-[500px] lg:min-h-[650px]"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt="Medical Background"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative h-full px-8 flex items-center sm:px-16 md:px-24">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Badge */}
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 sm:mb-8 sm:px-4 sm:py-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400 sm:h-2.5 sm:w-2.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-teal-300 sm:text-[10px]">
                          Specialty Medical Agency — Madurai
                        </span>
                      </div>

                      <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white mb-4 sm:text-6xl lg:text-7xl sm:mb-6">
                        {slide.title}
                      </h1>

                      <p className="mb-8 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg sm:mb-10">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <Link
                          to={slide.ctaLink}
                          className="group inline-flex items-center gap-3 rounded-full bg-teal-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-teal-500/30 transition hover:-translate-y-1 hover:bg-teal-400"
                        >
                          {slide.cta}
                          <ArrowRightOutlined className="text-xs transition-transform group-hover:translate-x-1.5" />
                        </Link>
                        <a
                          href="tel:+919790122512"
                          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
                        >
                          <PhoneOutlined />
                          Call Agent
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation */}
          <button className="hero-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white [&_.anticon]:!text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100 hover:bg-teal-500 hover:border-teal-500 cursor-pointer">
            <LeftOutlined className="!text-white" />
          </button>
          <button className="hero-next absolute right-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100 hover:bg-teal-400 hover:border-teal-400 cursor-pointer">
            <RightOutlined />
          </button>

          {/* Pagination Container */}
          <div className="custom-pagination !absolute !bottom-10 !left-1/2 !-translate-x-1/2 !z-20 !w-auto flex gap-2" />
        </Swiper>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 space-y-20">
        {/* ── SPECIALTIES ── */}
        <section className="space-y-8">
          <SectionHeading
            centered
            eyebrow="Our Specialties"
            title="Wide Range of Specialty Pharmaceuticals"
            description="From Oncology and Anaesthesia to Vaccines and HIV Antivirals — we supply the medicines that critical care demands."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {specialties.map((s) => (
              <motion.div key={s.name} variants={itemVariants}>
                <Link
                  to="/products"
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition cursor-pointer ${shadeMap[s.shade]}`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  {s.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── SERVICES ── */}
        <section className="space-y-8">
          <SectionHeading
            centered
            eyebrow="Services"
            title="Dependable Medical Services Built Around Your Needs"
            description="From quality assurance to after-sales care, we build trust through consistent, professional service."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md border-t-4 ${service.accent}`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl ${service.iconBg}`}
                >
                  {service.icon}
                </div>
                <h3 className="font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── ABOUT PREVIEW ── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="grid items-center gap-10 p-8 sm:p-12 md:grid-cols-2">
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-400">
                About Us
              </p>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Madurai's Most Trusted Specialty Drug Supplier
              </h2>
              <p className="leading-relaxed text-slate-300">
                With over two decades of experience, we are Madurai's leading
                supplier of specialty pharmaceuticals — serving hospitals,
                nursing homes, and clinics with authentic, licensed drugs and
                unmatched customer support.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "Licensed & Certified Distributor",
                  "Cold Chain Maintained Products",
                  "Narcotic Drug License Holder",
                  "Pan-Tamil Nadu Delivery Network",
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircleOutlined className="text-teal-400" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-400"
              >
                Learn More <ArrowRightOutlined />
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <img
                src={aboutPreviewImage}
                alt="Medical professionals"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="rounded-3xl border border-teal-100 bg-teal-50 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Need a specific specialty drug urgently?
              </h3>
              <p className="mt-1 text-slate-600">
                Call us anytime — we provide 24/7 emergency support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919790122512"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-teal-700"
              >
                <PhoneOutlined /> Emergency: +91 97901 22512
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-teal-600 px-6 py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default HomePage;
