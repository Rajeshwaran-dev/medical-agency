import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="space-y-10"
    >
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">About MediAgency</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Professional Healthcare Support You Can Trust</h1>
        <p className="mt-4 max-w-3xl text-blue-50">
          We combine medical expertise, reliable supply chains, and patient-first service to bring dependable
          healthcare products to your doorstep.
        </p>
      </section>

      <section className="grid gap-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
          alt="Healthcare team in a medical facility"
          className="h-full min-h-72 w-full rounded-2xl object-cover"
        />
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Who We Are"
            title="A Medical Agency Focused On Reliability"
            description="Our mission is to make healthcare essentials easy to access through quality products, transparent service, and dedicated support."
          />
          <p className="text-slate-600">
            We serve clinics, pharmacies, and families with a strong network of trusted partners. Every order is
            handled with care to ensure authenticity, speed, and confidence.
          </p>
        </div>
      </section>
    </motion.div>
  );
}

export default AboutPage;
