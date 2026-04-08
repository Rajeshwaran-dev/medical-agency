import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.article
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </motion.article>
  );
}

export default FeatureCard;
