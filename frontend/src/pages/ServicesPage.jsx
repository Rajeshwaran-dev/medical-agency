import React from "react";
import { motion } from "framer-motion";
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  MedicineBoxOutlined,
  AimOutlined,
  ExperimentOutlined,
  HeartOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Breadcrumbs from "../components/Breadcrumbs";

const ICONS = {
  safety: SafetyCertificateOutlined,
  medicine: MedicineBoxOutlined,
  aim: AimOutlined,
  experiment: ExperimentOutlined,
  heart: HeartOutlined,
  global: GlobalOutlined,
  rocket: RocketOutlined,
};

/** Full Tailwind class strings so JIT picks them up reliably */
const THEMES = {
  sky: {
    titleAccent: "group-hover:text-sky-900",
    indexNum: "text-sky-400/30 group-hover:text-sky-400/40",
    detailsHover: "group-hover:text-sky-600",
    blob: "bg-sky-400",
    iconShell:
      "bg-gradient-to-br from-sky-500/20 via-sky-400/10 to-cyan-400/15 ring-sky-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-sky-600",
    underline: "from-sky-500 to-cyan-400",
    chip: "border-sky-200/80 bg-sky-50/90 text-sky-800",
    glow: "from-sky-500/12 to-transparent",
  },
  rose: {
    titleAccent: "group-hover:text-rose-950",
    indexNum: "text-rose-400/30 group-hover:text-rose-400/40",
    detailsHover: "group-hover:text-rose-600",
    blob: "bg-rose-400",
    iconShell:
      "bg-gradient-to-br from-rose-500/20 via-rose-400/10 to-fuchsia-400/15 ring-rose-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-rose-600",
    underline: "from-rose-500 to-fuchsia-400",
    chip: "border-rose-200/80 bg-rose-50/90 text-rose-900",
    glow: "from-rose-500/12 to-transparent",
  },
  violet: {
    titleAccent: "group-hover:text-violet-950",
    indexNum: "text-violet-400/30 group-hover:text-violet-400/40",
    detailsHover: "group-hover:text-violet-600",
    blob: "bg-violet-500",
    iconShell:
      "bg-gradient-to-br from-violet-500/20 via-purple-400/10 to-indigo-400/15 ring-violet-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-violet-600",
    underline: "from-violet-600 to-indigo-400",
    chip: "border-violet-200/80 bg-violet-50/90 text-violet-900",
    glow: "from-violet-500/12 to-transparent",
  },
  cyan: {
    titleAccent: "group-hover:text-cyan-950",
    indexNum: "text-cyan-400/30 group-hover:text-cyan-400/40",
    detailsHover: "group-hover:text-cyan-600",
    blob: "bg-cyan-400",
    iconShell:
      "bg-gradient-to-br from-cyan-500/20 via-teal-400/10 to-emerald-400/12 ring-cyan-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-cyan-600",
    underline: "from-cyan-500 to-teal-400",
    chip: "border-cyan-200/80 bg-cyan-50/90 text-cyan-900",
    glow: "from-cyan-500/12 to-transparent",
  },
  indigo: {
    titleAccent: "group-hover:text-indigo-950",
    indexNum: "text-indigo-400/30 group-hover:text-indigo-400/40",
    detailsHover: "group-hover:text-indigo-600",
    blob: "bg-indigo-500",
    iconShell:
      "bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-sky-400/12 ring-indigo-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-indigo-600",
    underline: "from-indigo-600 to-blue-400",
    chip: "border-indigo-200/80 bg-indigo-50/90 text-indigo-900",
    glow: "from-indigo-500/12 to-transparent",
  },
  red: {
    titleAccent: "group-hover:text-red-950",
    indexNum: "text-red-400/30 group-hover:text-red-400/40",
    detailsHover: "group-hover:text-red-600",
    blob: "bg-red-400",
    iconShell:
      "bg-gradient-to-br from-red-500/18 via-rose-400/10 to-orange-300/12 ring-red-400/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-red-600",
    underline: "from-red-500 to-rose-400",
    chip: "border-red-200/80 bg-red-50/90 text-red-900",
    glow: "from-red-500/12 to-transparent",
  },
  emerald: {
    titleAccent: "group-hover:text-emerald-950",
    indexNum: "text-emerald-400/30 group-hover:text-emerald-400/40",
    detailsHover: "group-hover:text-emerald-600",
    blob: "bg-emerald-400",
    iconShell:
      "bg-gradient-to-br from-emerald-500/20 via-green-400/10 to-teal-400/12 ring-emerald-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-emerald-600",
    underline: "from-emerald-600 to-teal-400",
    chip: "border-emerald-200/80 bg-emerald-50/90 text-emerald-900",
    glow: "from-emerald-500/12 to-transparent",
  },
  blue: {
    titleAccent: "group-hover:text-blue-950",
    indexNum: "text-blue-400/30 group-hover:text-blue-400/40",
    detailsHover: "group-hover:text-blue-600",
    blob: "bg-blue-500",
    iconShell:
      "bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-sky-400/12 ring-blue-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-blue-600",
    underline: "from-blue-600 to-sky-400",
    chip: "border-blue-200/80 bg-blue-50/90 text-blue-900",
    glow: "from-blue-500/12 to-transparent",
  },
  amber: {
    titleAccent: "group-hover:text-amber-950",
    indexNum: "text-amber-400/35 group-hover:text-amber-400/45",
    detailsHover: "group-hover:text-amber-600",
    blob: "bg-amber-400",
    iconShell:
      "bg-gradient-to-br from-amber-500/22 via-yellow-400/10 to-orange-400/12 ring-amber-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-amber-700",
    underline: "from-amber-500 to-orange-400",
    chip: "border-amber-200/80 bg-amber-50/90 text-amber-950",
    glow: "from-amber-500/12 to-transparent",
  },
  orange: {
    titleAccent: "group-hover:text-orange-950",
    indexNum: "text-orange-400/30 group-hover:text-orange-400/40",
    detailsHover: "group-hover:text-orange-600",
    blob: "bg-orange-400",
    iconShell:
      "bg-gradient-to-br from-orange-500/20 via-amber-400/10 to-rose-300/12 ring-orange-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-orange-600",
    underline: "from-orange-500 to-amber-400",
    chip: "border-orange-200/80 bg-orange-50/90 text-orange-950",
    glow: "from-orange-500/12 to-transparent",
  },
  fuchsia: {
    titleAccent: "group-hover:text-fuchsia-950",
    indexNum: "text-fuchsia-400/30 group-hover:text-fuchsia-400/40",
    detailsHover: "group-hover:text-fuchsia-600",
    blob: "bg-fuchsia-500",
    iconShell:
      "bg-gradient-to-br from-fuchsia-500/20 via-pink-400/10 to-rose-400/12 ring-fuchsia-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-fuchsia-600",
    underline: "from-fuchsia-600 to-pink-400",
    chip: "border-fuchsia-200/80 bg-fuchsia-50/90 text-fuchsia-900",
    glow: "from-fuchsia-500/12 to-transparent",
  },
  slate: {
    titleAccent: "group-hover:text-slate-900",
    indexNum: "text-slate-400/35 group-hover:text-slate-400/45",
    detailsHover: "group-hover:text-slate-600",
    blob: "bg-slate-400",
    iconShell:
      "bg-gradient-to-br from-slate-600/18 via-slate-500/10 to-zinc-400/12 ring-slate-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-slate-700",
    underline: "from-slate-600 to-zinc-400",
    chip: "border-slate-200/80 bg-slate-50/90 text-slate-800",
    glow: "from-slate-500/12 to-transparent",
  },
  /** Cardiac — peach / coral accent (per design spec) */
  peach: {
    titleAccent: "group-hover:text-orange-950",
    indexNum: "text-orange-300/35 group-hover:text-orange-300/45",
    detailsHover: "group-hover:text-orange-600",
    blob: "bg-orange-300",
    iconShell:
      "bg-gradient-to-br from-orange-400/25 via-rose-300/18 to-amber-200/22 ring-orange-300/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-orange-500",
    underline: "from-orange-400 to-rose-300",
    chip: "border-orange-200/80 bg-orange-50/90 text-orange-900",
    glow: "from-orange-400/14 to-transparent",
  },
  /** Imported drugs — mint / teal accent */
  mint: {
    titleAccent: "group-hover:text-teal-950",
    indexNum: "text-teal-400/30 group-hover:text-teal-400/40",
    detailsHover: "group-hover:text-teal-600",
    blob: "bg-teal-300",
    iconShell:
      "bg-gradient-to-br from-teal-400/25 via-emerald-400/15 to-cyan-300/18 ring-teal-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
    iconText: "text-teal-600",
    underline: "from-teal-500 to-emerald-400",
    chip: "border-teal-200/80 bg-teal-50/90 text-teal-900",
    glow: "from-teal-500/12 to-transparent",
  },
};

const services = [
  {
    title: "Vaccines",
    description:
      "All types of vaccines available, vaccines keeps walkable cold room at 2-8 degress celcius",
    iconKey: "safety",
    themeKey: "sky",
  },
  {
    title: "Gynaec Products",
    description: "All types of harmone injections, IVF products available",
    iconKey: "medicine",
    themeKey: "rose",
  },
  {
    title: "Cancer",
    description:
      "Advanced oncology and supportive care products for comprehensive cancer treatment. all types of cancer drugs available.",
    iconKey: "aim",
    themeKey: "violet",
  },
  {
    title: "Human Immunoglobulin & Albumin",
    description:
      "Our range of Human Immunoglobulin & Albumin products are available based on medical requirements and hospital demand.All strengths available.",
    iconKey: "experiment",
    themeKey: "cyan",
  },
  {
    title: "Antidotes",
    description:
      "Supply of all types of antidotes including Anti Snake Venom, Flumazenil, Pralidoxime, etc. for wholesale requirements.",
    iconKey: "rocket",
    themeKey: "indigo",
  },
  {
    title: "Cardiac Products",
    description:
      "All ranges of cardiac injections, including clot-busting (thrombolytic) agents, are available for wholesale supply. All Types available.",
    iconKey: "heart",
    themeKey: "peach",
  },
  {
    title: "Nephrology Drugs",
    description:
      "All ranges of nephrology drugs including dialysis medicines and kidney transplant drugs are available for wholesale supply.",
    iconKey: "medicine",
    themeKey: "blue",
  },
  {
    title: "Neuro Products",
    description:
      "Advanced pharmaceutical support for neurological disorders and central nervous system health.",
    iconKey: "aim",
    themeKey: "amber",
  },
  {
    title: "Derma Skin Speciality",
    description:
      "Expert dermatological products for skin care, therapeutic treatments, and aesthetic health.",
    iconKey: "heart",
    themeKey: "orange",
  },
  {
    title: "HIV Products",
    description:
      "Modern antiretroviral medications and supportive care for comprehensive HIV management.",
    iconKey: "safety",
    themeKey: "fuchsia",
  },
  {
    title: "Lab Products",
    description:
      "Precision diagnostic tools and laboratory reagents for accurate medical testing and research.",
    iconKey: "experiment",
    themeKey: "slate",
  },
  {
    title: "Imported Drugs",
    description:
      "Access to globally sourced, high-quality international medications for specialized treatments.",
    iconKey: "global",
    themeKey: "mint",
  },
];

function ServiceCard({ service, index }) {
  const theme = THEMES[service.themeKey];
  const Icon = ICONS[service.iconKey];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.36) }}
      className="group relative h-full"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br opacity-0 blur-sm transition duration-500 group-hover:opacity-100 ${theme.glow}`}
        aria-hidden
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white via-white to-slate-50/90 p-7 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] ring-1 ring-white/80 transition duration-500 group-hover:-translate-y-1.5 group-hover:border-slate-200 group-hover:shadow-[0_28px_55px_-22px_rgba(37,99,235,0.22)]">
        {/* Decorative blobs */}
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-[0.14] blur-3xl transition duration-700 group-hover:opacity-[0.26] group-hover:scale-110 ${theme.blob}`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl transition duration-700 group-hover:bg-blue-400/18"
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-4 mb-4">
          <div
            className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl ring-2 transition duration-500 group-hover:scale-[1.06] group-hover:shadow-lg ${theme.iconShell}`}
          >
            <Icon className={`text-[1.65rem] ${theme.iconText}`} />
          </div>
          <span
            className={`select-none text-5xl font-bold leading-none transition duration-500 ${theme.indexNum}`}
            aria-hidden
          >
            {num}
          </span>
        </div>

        <h3 className="relative mt-6 text-xl font-bold tracking-tight text-slate-900">
          {service.title}
        </h3>

        <p className="relative mt-3 flex-grow text-[0.98rem] leading-relaxed text-slate-600">
          {service.description}
        </p>

        <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100/90 pt-5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] transition duration-300 ${theme.chip}`}
          >
            <CheckCircleOutlined className="text-[0.95rem]" />
            Trusted quality
          </span>
          <span
            className={`inline-flex items-center gap-1 text-sm font-semibold text-slate-400 transition duration-300 group-hover:gap-2 ${theme.detailsHover}`}
          >
            Details
            <ArrowRightOutlined className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Accent bar */}
        <div
          className={`absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-[0.35] bg-gradient-to-r opacity-70 transition duration-500 group-hover:scale-x-100 group-hover:opacity-100 ${theme.underline}`}
          aria-hidden
        />
      </div>
    </motion.article>
  );
}

const ServicesPage = () => {
  return (
    <div className="bg-slate-50/80">
      <div className="container mx-auto px-4 pt-1">
        <Breadcrumbs />
      </div>

      <section className="relative pb-20 pt-6 sm:pt-10">
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-white/55 py-6 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)] ring-1 ring-slate-200/60 backdrop-blur-md sm:mb-16 sm:rounded-[1.75rem] sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-50/90 via-white/40 to-blue-50/80" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />

            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm"
              >
                What we offer
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mb-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
              >
                Carefully curated{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  therapeutic areas
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                We provide a comprehensive range of high-quality medical
                products and services tailored to healthcare professionals and
                patients.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="mx-auto mt-3 max-w-xl text-sm text-slate-500"
              >
                Hover a card for depth, motion, and color cues matched to each
                specialty.
              </motion.p>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Committed to Medical Excellence
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Every product in our catalog undergoes rigorous quality checks to
            ensure it meets international standards for safety and efficacy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
