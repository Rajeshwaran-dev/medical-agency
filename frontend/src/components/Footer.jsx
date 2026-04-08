import { Link } from "react-router-dom";
import {
  ArrowUpOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";

const exploreLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/products", label: "Products" },
  { path: "/contact", label: "Contact" }
];

function Footer() {
  return (
    <footer className="relative mt-16 bg-slate-900 px-4 pb-10 pt-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_90%_88%,rgba(14,165,233,0.18),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-10">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-emerald-300">MediAgency</h3>
              <p className="max-w-xs text-sm leading-7 text-slate-300/95">
                We deliver trusted healthcare products and reliable support that creates real-world medical impact.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Trusted", "Medical", "24/7 Support"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-slate-200"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Explore</h4>
              <div className="space-y-2.5">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-slate-200 transition hover:translate-x-1 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Location</h4>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950/40 p-2">
                <iframe
                  title="MediAgency location"
                  src="https://maps.google.com/maps?q=Medical%20District&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-44 w-full rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2 leading-6">
                  <EnvironmentOutlined className="mt-1 text-emerald-300" />
                  24 Health Avenue, Medical District
                </li>
                <li className="flex items-center gap-2">
                  <PhoneOutlined className="text-emerald-300" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MailOutlined className="text-emerald-300" />
                  support@mediagency.com
                </li>
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  aria-label="Whatsapp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-400/15 text-emerald-200 shadow-[0_0_20px_rgba(74,222,128,0.3)] transition hover:-translate-y-0.5 hover:bg-emerald-400/25"
                >
                  <PhoneOutlined />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/50 bg-violet-400/15 text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.3)] transition hover:-translate-y-0.5 hover:bg-violet-400/25"
                >
                  <InstagramFilled />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/50 bg-sky-400/15 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition hover:-translate-y-0.5 hover:bg-sky-400/25"
                >
                  <FacebookFilled />
                </a>
                <a
                  href="#"
                  aria-label="Linkedin"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition hover:-translate-y-0.5 hover:bg-cyan-400/25"
                >
                  <LinkedinFilled />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
              <span>© {new Date().getFullYear()} MediAgency. All rights reserved.</span>
              <span>Professional Healthcare Solutions</span>
            </div>
          </div>
        </div>

        <a
          href="#top"
          className="absolute -right-2 bottom-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-100 transition hover:bg-white/20"
          aria-label="Back to top"
        >
          <ArrowUpOutlined />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
