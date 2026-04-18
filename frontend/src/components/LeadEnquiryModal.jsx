import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { publicApi } from "../services/api";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
};

function LeadEnquiryModal({
  open,
  onClose,
  onSuccess,
  title = "Quick Enquiry Form",
  subtitle = "Share your requirement and our team will contact you shortly.",
  initialSubject = "",
  productId = "",
}) {
  const [leadForm, setLeadForm] = useState(initialFormState);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");

  if (!open) return null;

  const handleLeadChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setLeadError("");
    setLeadSubmitting(true);

    try {
      await publicApi.post("/leads", {
        ...leadForm,
        subject: leadForm.subject || initialSubject,
        productId: productId || undefined,
      });
      setLeadForm(initialFormState);
      onClose();
      onSuccess?.("Your enquiry has been submitted successfully.");
    } catch (error) {
      setLeadError(
        error?.response?.data?.message ||
          "Unable to submit enquiry. Please try again.",
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-slate-950/55 backdrop-blur-xl p-3 pb-6 sm:items-center sm:p-4 sm:pb-4 mb-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[min(90dvh,calc(100dvh-24px))] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_30px_90px_-25px_rgba(2,6,23,0.45)] ring-1 ring-slate-100 sm:rounded-[28px]"
      >
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-7 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-[11px] sm:tracking-[0.3em]">
                Request A Callback
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
                {title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-500">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-base text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <CloseOutlined />
            </button>
          </div>
        </div>

        <form onSubmit={handleLeadSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:space-y-5 sm:px-7 sm:py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  name="name"
                  value={leadForm.name}
                  onChange={handleLeadChange}
                  required
                  placeholder="Enter full name"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={leadForm.email}
                  onChange={handleLeadChange}
                  required
                  placeholder="example@company.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={handleLeadChange}
                  required
                  placeholder="+91 12345 67890"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Hospital / Clinic
                </span>
                <input
                  name="organization"
                  value={leadForm.organization}
                  onChange={handleLeadChange}
                  placeholder="Enter organization name"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Subject</span>
              <input
                name="subject"
                value={leadForm.subject}
                onChange={handleLeadChange}
                placeholder={initialSubject || "Medicine or requirement"}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                name="message"
                rows={5}
                value={leadForm.message}
                onChange={handleLeadChange}
                placeholder="Describe your enquiry in brief"
                className="mt-2 w-full min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {leadError && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {leadError}
              </p>
            )}
          </div>
          <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3.5 sm:px-7 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="submit"
                disabled={leadSubmitting}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-300/50 transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {leadSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadEnquiryModal;
