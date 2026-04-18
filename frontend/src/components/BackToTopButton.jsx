import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Move to top"
      onClick={scrollToTop}
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      className={`fixed z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-slate-900/85 text-white shadow-[0_10px_30px_rgba(2,6,23,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpOutlined className="!text-white" />
    </button>
  );
}

export default BackToTopButton;
