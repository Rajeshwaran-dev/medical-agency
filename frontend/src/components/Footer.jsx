import { Link } from "react-router-dom";
import {
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
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" }
];

function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-slate-950 px-4 pb-10 pt-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(20,184,166,0.2),transparent_32%),radial-gradient(circle_at_94%_88%,rgba(37,99,235,0.2),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#0b1220_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.15fr_0.75fr_1fr_1.1fr] xl:gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="MediAgency logo"
                  className="h-16 w-16 rounded-lg object-contain sm:h-24 sm:w-24 sm:rounded-xl"
                />
              </div>
              <p className="max-w-xs text-base leading-7 text-slate-300/95">
                We deliver trusted healthcare products and reliable support that creates real-world medical impact.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
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

            <div className="space-y-4 xl:pr-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Explore</h4>
              <div className="space-y-2.5">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-base text-slate-200 transition hover:translate-x-1 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 xl:-ml-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Location</h4>
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950/40 p-2">
                <iframe
                  title="MediAgency location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1235332822187!2d78.1324607!3d9.9265799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c59e7c384de3%3A0x41d91d57ddef0eab!2sMADURAI%20LIFE%20CARE%20DRUGS!5e0!3m2!1sen!2sin!4v1714040000000"
                  className="h-44 w-full rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Contact</h4>
              <ul className="space-y-3 text-base text-slate-200">
                <li className="flex items-start gap-2 leading-6">
                  <EnvironmentOutlined className="mt-1 text-emerald-300" />
                  18, Second Floor, Vaidyanatha Iyer Street, Shenoy Nagar, Madurai - 625020
                </li>
                <li className="flex items-start gap-2">
                  <PhoneOutlined className="mt-1 text-emerald-300" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919790122512" className="transition hover:text-emerald-300">
                      +91 97901 22512
                    </a>
                    <a href="tel:+919566305951" className="transition hover:text-emerald-300">
                      +91 95663 05951
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <MailOutlined className="text-emerald-300" />
                  <a href="mailto:madurailifecaredrugs@gmail.com" className="transition hover:text-emerald-300">
                    madurailifecaredrugs@gmail.com
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="tel:+919790122512"
                  aria-label="Call us"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-400/15 text-emerald-200 shadow-[0_0_20px_rgba(74,222,128,0.3)] transition hover:-translate-y-0.5 hover:bg-emerald-400/25"
                >
                  <PhoneOutlined />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/50 bg-violet-400/15 text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.3)] transition hover:-translate-y-0.5 hover:bg-violet-400/25"
                >
                  <InstagramFilled />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/50 bg-sky-400/15 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition hover:-translate-y-0.5 hover:bg-sky-400/25"
                >
                  <FacebookFilled />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Linkedin"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition hover:-translate-y-0.5 hover:bg-cyan-400/25"
                >
                  <LinkedinFilled />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex flex-col gap-3 text-base text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} MediAgency. All rights reserved.</span>
              <span>Professional Healthcare Solutions</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
