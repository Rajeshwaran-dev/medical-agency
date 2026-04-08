import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/products", label: "Products" },
  { path: "/contact", label: "Contact" }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion.create(Link);

  const navItemClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-blue-700"
          onClick={() => setIsOpen(false)}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
            MA
          </span>
          MediAgency
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className={navItemClass}>
              {link.label}
            </NavLink>
          ))}
          <MotionLink
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            to="/contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200"
          >
            Get In Touch
          </MotionLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 text-blue-700 transition hover:bg-blue-50 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-blue-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={navItemClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
