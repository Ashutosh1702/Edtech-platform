import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccessPage() {
  const loc = useLocation();
  const nav = useNavigate();
  const params = new URLSearchParams(loc.search);
  const urlSuccess =
    params.get("success") === "1" || params.get("status") === "COMPLETED";
  const urlOrderId = params.get("orderId") || "";
  const urlAmount = params.get("amount");
  const urlCurrency = params.get("currency");

  const [last] = useState(() => {
    try {
      const raw = localStorage.getItem("edtech_last_payment");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [ctx] = useState(() => {
    try {
      const raw = localStorage.getItem("edtech_checkout_context");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const success = urlSuccess || !!last?.success;
  const orderId =
    urlOrderId ||
    last?.orderId ||
    last?.localOrderId ||
    ctx?.orderId ||
    ctx?.localOrderId ||
    "";
  const amount =
    urlAmount ||
    (last?.amount != null ? String(last.amount) : undefined) ||
    (ctx?.amount != null ? String(ctx.amount) : undefined);
  const currency = urlCurrency || last?.currency || ctx?.currency || "INR";

  const course = last?.course || ctx?.course;
  // Do NOT pull backend/local detail mappings here — prefer the exact course object
  // that the user selected and that was recorded in the payment payload.
  const details = useMemo(() => {
    // Accept course.details if the payment payload included richer info
    return course?.details || null;
  }, [course]);

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "";
  const waHref = waNumber
    ? `https://wa.me/${String(waNumber).replace(/[^\d+]/g, "")}?text=${encodeURIComponent(
        `Hi, I have a question about my order ${orderId || ""}`
      )}`
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              success ? "bg-emerald-600/20" : "bg-rose-600/20"
            }`}
          >
            <span
              className={`${success ? "text-emerald-600" : "text-rose-500"}`}
            >
              {success ? "✓" : "✕"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {success ? "Payment Successful" : "Payment Failed"}
          </h1>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="ml-3 inline-flex items-center gap-2 text-sm text-green-400 bg-green-900/5 px-3 py-1 rounded-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.7 2.3A11.9 11.9 0 0012 .1C6 0 .9 5.1.9 11.1c0 1.9.5 3.8 1.5 5.5L.1 24l7.6-2.1c1.6.9 3.4 1.4 5.3 1.4 6 0 11.1-5.1 11.1-11.1 0-3-1.2-5.8-3.4-7.9z" fill="#25D366"/>
                <path d="M17 14.1c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.1-.9.3s-1 1.2-1.2 1.4c-.2.2-.4.3-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.7.1-.2.2-.4.3-.7.1-.2.1-.4 0-.6-.1-.2-1-2.4-1.4-3.3-.4-.9-.8-.6-1.1-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1 3 1.2 3.2.2.2 2 3.1 4.8 4.4 3 .1 3 .9 4.9 1.1 1.4.1 2.3.1 3-.5.7-.6.7-1.4.6-1.6-.1-.2-.4-.3-.8-.5z" fill="#fff"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          )}
        </div>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {success
            ? "Your payment has been processed. A confirmation has been recorded."
            : "We couldn't process your payment. You can try again or contact support."}
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg p-3">
            <span className="text-slate-500">Order ID</span>
            <span className="font-mono">{orderId || "-"}</span>
          </div>

          <div className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg p-3">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold">
              {currency || "INR"} {amount || "-"}
            </span>
          </div>

          <div className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg p-3">
            <span className="text-slate-500">Method</span>
            <span className="font-medium uppercase">
              {last?.method || ctx?.method || "-"}
            </span>
          </div>
        </div>

        {course && (
          <div className="mt-10 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {course.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {course.instructor}
                </p>
              </div>

              {/* Show only description coming from the selected course payload */}
              {details?.description ? (
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/40">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Introduction
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {details.description}
                  </p>
                </div>
              ) : null}

              {details?.learningOutcomes && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                  <h3 className="text-sm font-semibold mb-2">
                    What you'll learn
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {details.learningOutcomes.slice(0, 6).map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {details?.courseStructure && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                  <h3 className="text-sm font-semibold mb-3">
                    Course Structure
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {details.courseStructure.slice(0, 4).map((s, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900"
                      >
                        <div className="font-medium">{s.title}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {s.lectures} lectures • {s.duration}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {s.topics.slice(0, 3).map((t, j) => (
                            <span
                              key={j}
                              className="px-2 py-0.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="md:col-span-2">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {course.bannerImg ? (
                      <img
                        src={course.bannerImg}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        {course.banner || course.title?.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Course</div>
                    <div className="font-semibold">{course.title}</div>
                    <div className="text-xs text-slate-500">
                      {course.instructor}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">
                      Price
                    </span>
                    <span className="font-medium">
                      ₹{Number(course.price || 0).toFixed(2)}
                    </span>
                  </div>
                  {last?.tax != null && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">
                        GST (18%)
                      </span>
                      <span className="font-medium">
                        ₹{Number(last.tax).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {last?.amount != null && (
                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-base font-semibold">
                      <span>Total</span>
                      <span>₹{Number(last.amount).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {details?.whatYouGet && (
                <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                  <h3 className="text-sm font-semibold mb-2">
                    What's included
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {details.whatYouGet.slice(0, 6).map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => nav("/courses")}
            title="Browse all available courses"
            className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Browse Courses
          </button>
          <button
            onClick={() => nav("/syllabus")}
            title={
              course
                ? "View syllabus for the purchased course"
                : "View all course syllabi"
            }
            className="h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-700"
          >
            {course ? "View Syllabus (this course)" : "View Syllabus"}
          </button>
          <button
            onClick={() => nav("/")}
            title="Return to homepage"
            className="h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-700"
          >
            Go Home
          </button>
          {/* Offer an online test option after successful payment — pass the selected course object */}
          {course && (
            <button
              onClick={() => nav("/online-test", { state: { course } })}
              className="h-10 px-4 rounded-lg border border-emerald-500 text-emerald-600 font-semibold"
            >
              Take Online Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
