import whatsappIcon from "../assets/images/whatsapp-icon.png";

/** E.164 without + — same primary line as Navbar / Footer */
const WHATSAPP_E164 = "919790122512";

const defaultMessage =
  "Hi, I would like to know more about Madurai Lifecare Drugs / MediAgency. Please assist.";

function FloatingWhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="WhatsApp us"
      style={{
        bottom: "max(6rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      className="fixed z-[65] inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-[0_8px_28px_rgba(37,211,102,0.45)] ring-2 ring-white/90 transition hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-[3.75rem] sm:w-[3.75rem]"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="h-full w-full object-cover"
      />
    </a>
  );
}

export default FloatingWhatsAppButton;
