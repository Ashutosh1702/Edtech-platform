import { useState } from "react";

function WhatsappIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.7 2.3A11.9 11.9 0 0012 .1C6 0 0.9 5.1.9 11.1c0 1.9.5 3.8 1.5 5.5L.1 24l7.6-2.1c1.6.9 3.4 1.4 5.3 1.4 6 0 11.1-5.1 11.1-11.1 0-3-1.2-5.8-3.4-7.9z" fill="#25D366"/>
      <path d="M17 14.1c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.1-.9.3s-1 1.2-1.2 1.4c-.2.2-.4.3-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.7.1-.2.2-.4.3-.7.1-.2.1-.4 0-.6-.1-.2-1-2.4-1.4-3.3-.4-.9- .8-.6-1.1-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1 3 1.2 3.2.2.2 2 3.1 4.8 4.4 3 .1 3 .9 4.9 1.1 1.4.1 2.3.1 3-.5.7-.6.7-1.4.6-1.6-.1-.2-.4-.3-.8-.5z" fill="#fff"/>
    </svg>
  );
}

export default function ContactButton() {
  const [open, setOpen] = useState(false);

  // Configure via environment variables or edit here
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ""; // e.g. 919999999999
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || "support@example.com";
  const message = encodeURIComponent("Hi, I need help with my course and payment.");

  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d+]/g, "")}?text=${message}`
    : null;

  if (!waHref && !supportEmail) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {open && (
          <div className="flex flex-col items-end gap-2 animate-fade-in">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white text-slate-900 shadow-lg hover:shadow-2xl"
              >
                <WhatsappIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Chat on WhatsApp</span>
              </a>
            )}

            {supportEmail && (
              <a
                href={`mailto:${supportEmail}?subject=${encodeURIComponent("Support request")}&body=${message}`}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white text-slate-900 shadow-lg hover:shadow-2xl"
              >
                <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8.5v7A2.5 2.5 0 005.5 18h13a2.5 2.5 0 002.5-2.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6.5a2.5 2.5 0 00-2.5-2.5h-13A2.5 2.5 0 003 6.5v.5l9 5 9-5v-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium">Email Support</span>
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Contact support"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform"
        >
          <WhatsappIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
