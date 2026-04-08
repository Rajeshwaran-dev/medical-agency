import { motion } from "framer-motion";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import SectionHeading from "../components/SectionHeading";

function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="space-y-10"
    >
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Contact Us</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">We Are Here To Support Your Healthcare Needs</h1>
        <p className="mt-4 max-w-2xl text-blue-50">
          Reach out to our team for product inquiries, partnership opportunities, or support.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { icon: <MailOutlined />, title: "Email", value: "support@mediagency.com" },
          { icon: <PhoneOutlined />, title: "Phone", value: "+1 (555) 123-4567" },
          { icon: <EnvironmentOutlined />, title: "Address", value: "24 Health Avenue, Medical District" }
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
              {item.icon}
            </div>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          eyebrow="Send Message"
          title="Let's Discuss How We Can Help"
          description="Use this form to share your requirements and our team will get back to you soon."
        />
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="text"
            placeholder="Subject"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2"
          />
          <button
            type="button"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:col-span-2 sm:w-fit"
          >
            Submit Inquiry
          </button>
        </form>
      </section>
    </motion.div>
  );
}

export default ContactPage;
