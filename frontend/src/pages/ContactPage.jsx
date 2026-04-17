import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";
import { publicApi } from "../services/api";

const contactCards = [
  {
    icon: <PhoneOutlined />,
    title: "MD Direct",
    value: "+91 97901 22512",
    sub: "Arun Kumar, MD",
    href: "tel:+919790122512",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    accent: "border-t-blue-500",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "24/7 Emergency",
    value: "+91 99528 12513",
    sub: "Critical drug supply",
    href: "tel:+919952812513",
    color: "bg-red-50 text-red-600 border-red-100",
    accent: "border-t-red-500",
  },
  {
    icon: <PhoneOutlined />,
    title: "Billing & Orders",
    value: "+91 97871 12515",
    sub: "Also: +91 97515 30563",
    href: "tel:+919787112515",
    color: "bg-teal-50 text-teal-600 border-teal-100",
    accent: "border-t-teal-500",
  },
  {
    icon: <PhoneOutlined />,
    title: "Accounts",
    value: "+91 97513 82327",
    sub: "Landline: 0452-436 1405",
    href: "tel:+919751382327",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    accent: "border-t-indigo-500",
  },
  {
    icon: <MailOutlined />,
    title: "Email",
    value: "support@mediagency.com",
    sub: "We respond within 24hrs",
    href: "mailto:support@mediagency.com",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    accent: "border-t-amber-500",
  },
  {
    icon: <EnvironmentOutlined />,
    title: "Address",
    value: "Shenoy Nagar, Madurai",
    sub: "No.24, Vaithiyanathariyar Road, Goripalayamm – 625020",
    href: "https://maps.google.com/?q=Shenoy+Nagar+Goripalayam+Madurai",
    color: "bg-green-50 text-green-600 border-green-100",
    accent: "border-t-green-500",
  },
];

function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ success: "", error: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ success: "", error: "" });
    setSubmitting(true);

    try {
      await publicApi.post("/leads", contactForm);
      setSubmitStatus({
        success: "Enquiry submitted successfully.",
        error: "",
      });
      setContactForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: "",
        error:
          error?.response?.data?.message ||
          "Unable to submit enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      transition={{ duration: 0.35 }}
      className="space-y-12 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <Breadcrumbs />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-teal-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
              Contact Us
            </span>
          </div>
          <h1 className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            We're Here To Support{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
              Your Healthcare Needs
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Reach out for product inquiries, partnership opportunities, bulk
            orders, or 24/7 emergency drug supply. Our team is always ready to
            help.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:+919952812513"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-400"
            >
              🚨 Emergency: +91 99528 12513
            </a>
            <a
              href="https://wa.me/919790122512"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <WhatsAppOutlined /> WhatsApp
            </a>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />
      </section>

      {/* ── CONTACT CARDS ── */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
            Get In Touch
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Multiple Ways To Reach Us
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={
                card.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md border-t-4 ${card.accent}`}
            >
              <div
                className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg ${card.color} border`}
              >
                {card.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {card.title}
              </p>
              <p className="mt-1 font-bold text-slate-900">{card.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{card.sub}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            eyebrow="Send Message"
            title="Let's Discuss How We Can Help"
            description="Share your requirements and our team will respond promptly."
          />
          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <input
              name="name"
              type="text"
              value={contactForm.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              required
            />
            <input
              name="email"
              type="email"
              value={contactForm.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              required
            />
            <input
              name="phone"
              type="tel"
              value={contactForm.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              required
            />
            <input
              name="organization"
              type="text"
              value={contactForm.organization}
              onChange={handleChange}
              placeholder="Hospital / Clinic Name"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
            />
            <input
              name="subject"
              type="text"
              value={contactForm.subject}
              onChange={handleChange}
              placeholder="Subject / Drug Name"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 sm:col-span-2"
            />
            <textarea
              name="message"
              rows={4}
              value={contactForm.message}
              onChange={handleChange}
              placeholder="Your Message or Requirement"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 sm:col-span-2"
            />
            {submitStatus.error && (
              <p className="text-sm text-red-600 sm:col-span-2">
                {submitStatus.error}
              </p>
            )}
            {submitStatus.success && (
              <p className="text-sm text-green-600 sm:col-span-2">
                {submitStatus.success}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-200 transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:w-fit"
            >
              {submitting ? "Submitting..." : "Submit Inquiry →"}
            </button>
          </form>
        </div>

        {/* Address + Map */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-4">
              Our Location
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <EnvironmentOutlined className="text-teal-500 mt-0.5 flex-shrink-0 text-base" />
                <div>
                  <p className="font-semibold text-slate-800">
                    Madurai Life Care Drugs
                  </p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    No.24, Ground Floor, Vaithiyanathariyar Road,
                    <br />
                    Shenoy Nagar, Goripalayamm,
                    <br />
                    Madurai – 625020
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Office Hours</span>
                  <span className="font-medium text-slate-700">
                    8:00 AM – 9:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emergency</span>
                  <span className="font-medium text-green-600">
                    24/7 Available
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sunday</span>
                  <span className="font-medium text-slate-700">
                    By Appointment
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <iframe
              title="Madurai Life Care Drugs Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9!2d78.1198!3d9.9313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnNTIuNyJOIDc4wrAwNycxMS4zIkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default ContactPage;
