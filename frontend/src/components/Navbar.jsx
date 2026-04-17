import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MenuOutlined, CloseOutlined, PhoneOutlined } from "@ant-design/icons";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/products", label: "Products" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemClass = ({ isActive }) =>
    `relative text-base font-medium px-4 py-2 rounded-md transition-all duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
    }`;

  const mobileNavItemClass = ({ isActive }) =>
    `flex items-center gap-2 text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-200/60 border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700" />

      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand / Logo ── */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/logo.png"
            alt="MediAgency logo"
            className="h-20 w-20 rounded-xl object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={navItemClass}
              end={link.path === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop Right Actions ── */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+9952812513"
            className="inline-flex items-center gap-1.5 text-base font-medium text-slate-500 transition-colors duration-200 hover:text-blue-600"
          >
            <PhoneOutlined className="text-blue-500" />
            <span>+91 99528 12513</span>
          </a>
          <div className="h-5 w-px bg-slate-200" />
          <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-blue-200 transition-shadow hover:shadow-lg hover:shadow-blue-300"
            >
              Get In Touch
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          type="button"
          id="navbar-mobile-toggle"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-4">
              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={mobileNavItemClass}
                    onClick={() => setIsOpen(false)}
                    end={link.path === "/"}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="my-4 h-px w-full bg-slate-100" />

              {/* Mobile CTA */}
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+9952812513"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
                >
                  <PhoneOutlined className="text-blue-500" />
                  +91 99528 12513
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200"
                >
                  Get In Touch
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
