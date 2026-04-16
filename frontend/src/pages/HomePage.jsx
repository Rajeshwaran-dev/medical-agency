import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import SectionHeading from "../components/SectionHeading";

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

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-20"
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-teal-900 text-white">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />

        <div className="relative px-8 pb-10 pt-12 sm:px-12 sm:pt-16">
          {/* top badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-300">
              Specialty Medical Agency — Madurai
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
                Trusted Healthcare
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                  Solutions For Every
                </span>
                Family & Hospital
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
                We supply certified specialty medicines — Oncology, Critical Care,
                Anaesthesia, Vaccines, and more — to hospitals and clinics across
                Tamil Nadu with speed and reliability.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition hover:-translate-y-0.5 hover:bg-teal-400"
                >
                  Browse Products
                  <ArrowRightOutlined className="text-xs transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+919790122512"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <PhoneOutlined />
                  Call Now
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-3xl font-extrabold text-teal-300">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom accent strip */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />
      </section>

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
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl ${service.iconBg}`}>
                {service.icon}
              </div>
              <h3 className="font-bold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="grid items-center gap-10 p-8 sm:p-12 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400">About Us</p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Madurai's Most Trusted Specialty Drug Supplier
            </h2>
            <p className="leading-relaxed text-slate-300">
              With over two decades of experience, we are Madurai's leading supplier of specialty
              pharmaceuticals — serving hospitals, nursing homes, and clinics with authentic,
              licensed drugs and unmatched customer support.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {["Licensed & Certified Distributor", "Cold Chain Maintained Products", "Narcotic Drug License Holder", "Pan-Tamil Nadu Delivery Network"].map((pt) => (
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
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
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
            <p className="mt-1 text-slate-600">Call us anytime — we provide 24/7 emergency support.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+919952812513"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-teal-700"
            >
              <PhoneOutlined /> Emergency: +91 99528 12513
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
    </motion.div>
  );
}

export default HomePage;