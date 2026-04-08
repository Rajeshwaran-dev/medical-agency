import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  TruckOutlined
} from "@ant-design/icons";
import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";

const services = [
  {
    title: "Quality Medicines",
    description: "Certified and quality-checked medical products from trusted manufacturers.",
    icon: <SafetyCertificateOutlined />
  },
  {
    title: "Fast Delivery",
    description: "Quick and secure delivery network for homes, clinics, and hospitals.",
    icon: <TruckOutlined />
  },
  {
    title: "Trusted Partners",
    description: "We work with proven healthcare partners to ensure consistent reliability.",
    icon: <CheckCircleOutlined />
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help with orders and product guidance.",
    icon: <ClockCircleOutlined />
  }
];

const featuredProducts = [
  {
    name: "Digital Thermometer",
    description: "Fast and accurate readings for daily temperature monitoring.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Blood Pressure Monitor",
    description: "Reliable at-home blood pressure tracking with easy-to-read display.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "First Aid Essentials",
    description: "Comprehensive safety kit for emergency and routine care situations.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Daily Care Supplements",
    description: "Balanced vitamins and nutrition support for overall wellness.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80"
  }
];

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="space-y-16"
    >
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white shadow-xl shadow-blue-200 sm:p-12">
        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-200/20 blur-2xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Medical Agency</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
              Trusted Healthcare Solutions For Every Family
            </h1>
            <p className="mt-4 max-w-xl text-blue-50">
              We provide reliable medical products, seamless service, and dedicated support to help you care
              better, faster, and smarter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["Certified Products", "Fast Delivery", "Trusted Partners", "24/7 Support"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/15 p-4 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          centered
          eyebrow="Services"
          title="Dependable Medical Services Designed Around Your Needs"
          description="From product quality to after-sales care, we focus on building trust through consistent service."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      <section className="grid items-center gap-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
          alt="Medical professionals discussing patient care"
          className="h-72 w-full rounded-2xl object-cover"
        />
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="Committed To Better Healthcare Access"
            description="MediAgency helps communities and healthcare teams access trusted products with transparent service and dependable logistics."
          />
          <Link
            to="/about"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Read More
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Products"
          title="Featured Healthcare Products"
          description="Explore a curated range of essential products trusted by professionals and families."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((item) => (
            <motion.article
              key={item.name}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
            >
              <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div>
          <Link
            to="/products"
            className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            View All Products
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;
