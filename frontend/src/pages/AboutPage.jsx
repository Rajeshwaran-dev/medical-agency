import { motion } from "framer-motion";
import { CheckCircleOutlined, SafetyCertificateOutlined, TruckOutlined, StarOutlined } from "@ant-design/icons";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

const specialtyRanges = [
  {
    category: "Surgery & ICU",
    color: "border-l-blue-500 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    items: ["Anaesthesia", "Critical Care", "Transplant Drugs", "Narcotic Drugs"],
  },
  {
    category: "Oncology & Specialty",
    color: "border-l-purple-500 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
    items: ["Oncology Drugs", "Immunoglobulins", "Human Immunuglobin", "Imported Drugs"],
  },
  {
    category: "Organ & System Care",
    color: "border-l-teal-500 bg-teal-50",
    badge: "bg-teal-100 text-teal-700",
    items: ["Nephrology", "Cardiac Products", "Neuro Products", "Derma Skin Speciality"],
  },
  {
    category: "Preventive & Women's Health",
    color: "border-l-pink-500 bg-pink-50",
    badge: "bg-pink-100 text-pink-700",
    items: ["Vaccines", "Pediatric Vaccines", "Gynaecology Drugs", "Lab Products"],
  },
  {
    category: "Infectious Disease",
    color: "border-l-orange-500 bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    items: ["HIV Antiviral Drugs", "HIV Products", "Cardiac Products", "Anexet (Flumazanil)"],
  },
];

const highlights = [
  { icon: <SafetyCertificateOutlined />, title: "Licensed Distributor", desc: "Holds valid drug distribution licenses including narcotic drug permissions." },
  { icon: <TruckOutlined />, title: "Cold Chain Logistics", desc: "Maintaining temperature-sensitive drug integrity with cold chain delivery." },
  { icon: <StarOutlined />, title: "24+ Years Experience", desc: "Decades of expertise serving the Madurai healthcare ecosystem." },
  { icon: <CheckCircleOutlined />, title: "Authentic Products", desc: "Only original, manufacturer-certified pharmaceutical products." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      transition={{ duration: 0.35 }}
      className="space-y-16 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <Breadcrumbs />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-teal-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-blue-500/20 blur-2xl" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
              About MediAgency
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Professional Healthcare Support{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
              You Can Trust
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            We combine medical expertise, reliable supply chains, and patient-first service to deliver
            dependable specialty pharmaceuticals to your doorstep — across Madurai and Tamil Nadu.
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
            alt="Healthcare team at Madurai Life Care Drugs"
            className="h-full min-h-72 w-full rounded-2xl object-cover"
          />
        </div>
        <div className="space-y-5 flex flex-col justify-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Who We Are</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Madurai's Leading Specialty Drug Distributor
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Founded by <strong className="text-slate-800">Arun Kumar MD</strong>, we have been at the
            forefront of specialty pharmaceutical distribution in Madurai for over two decades. Our
            mission is to bridge the gap between critical drug manufacturers and the healthcare
            facilities that need them most.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We serve multi-speciality hospitals, nursing homes, cancer centres, IVF clinics, and
            government institutions — ensuring every patient gets the right medicine at the right time.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Government Licensed", "Cold Chain Certified", "Narcotic Drug License", "Pan-TN Delivery"].map((pt) => (
              <div key={pt} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <CheckCircleOutlined className="text-teal-500" />
                {pt}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="space-y-8">
        <SectionHeading
          centered
          eyebrow="Why Choose Us"
          title="Built on Reliability, Trust & Clinical Expertise"
          description="Our strengths go beyond just delivery — we are your dependable healthcare partner."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center hover:shadow-md transition"
            >
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-600">
                {h.icon}
              </div>
              <h3 className="font-bold text-slate-900">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SPECIALTY RANGES ── */}
      <section className="space-y-8">
        <SectionHeading
          eyebrow="Product Range"
          title="Complete Specialty Pharmaceutical Coverage"
          description="We stock and supply across all major medical specialities — ensuring no prescription goes unfilled."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {specialtyRanges.map((range) => (
            <motion.div
              key={range.category}
              variants={itemVariants}
              className={`rounded-2xl border-l-4 p-5 ${range.color}`}
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold mb-3 ${range.badge}`}>
                {range.category}
              </span>
              <ul className="space-y-2">
                {range.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── LEADERSHIP CALLOUT ── */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white sm:p-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">Leadership</p>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Arun Kumar, MD</h2>
            <p className="mt-1 text-teal-300 font-semibold">Managing Director, MediAgency</p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              With deep clinical knowledge and two decades of pharmaceutical distribution experience,
              Arun Kumar has built one of Madurai's most trusted medical supply businesses — focusing
              on critical, specialty, and life-saving medicines.
            </p>
            <p className="mt-3 text-slate-400 text-sm">
              📍 No.24, Ground Floor, Vaithiyanathariyar Road, Shenoy Nagar, Madurai – 625020
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <p className="text-sm font-semibold text-teal-300 uppercase tracking-wide">Contact Details</p>
            {[
              { label: "MD Direct", value: "+91 97901 22512" },
              { label: "Billing", value: "+91 97871 12515" },
              { label: "Accounts", value: "+91 97513 82327" },
              { label: "Emergency", value: "+91 99528 12513" },
              { label: "Landline", value: "0452 – 436 1405" },
            ].map((c) => (
              <div key={c.label} className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">{c.label}</span>
                <a href={`tel:${c.value.replace(/\s|-/g, "")}`} className="font-semibold text-white hover:text-teal-300">
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default AboutPage;