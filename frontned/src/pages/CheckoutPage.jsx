import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  const [tab, setTab] = useState("upi");
  const [upiApp, setUpiApp] = useState("gpay");
  const [vpa, setVpa] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!course) {
      navigate("/courses", { replace: true });
    }
  }, [course, navigate]);

  const totals = useMemo(() => {
    const base = Number(course?.price || 0);
    const tax = Math.round(base * 0.18 * 100) / 100; // 18%
    const total = Math.round((base + tax) * 100) / 100;
    return { base, tax, total };
  }, [course]);

  const [checkoutCtx] = useState(() => {
    try {
      const raw = localStorage.getItem("edtech_checkout_context");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const mockPay = async () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
      const payload = {
        orderId,
        currency: "INR",
        amount: totals.total,
        tax: totals.tax,
        base: totals.base,
        method: tab,
        upiApp,
        vpa: vpa.trim(),
        course,
        ts: Date.now(),
        success: true,
      };
      try {
        localStorage.setItem("edtech_last_payment", JSON.stringify(payload));
        const historyKey = "edtech_payments";
        const prev = JSON.parse(localStorage.getItem(historyKey) || "[]");
        prev.push(payload);
        localStorage.setItem(historyKey, JSON.stringify(prev));
      } catch {
        void 0;
      }
      navigate(`/payment-success?success=1&orderId=${orderId}&amount=${totals.total}&currency=INR`, {
        replace: true,
      });
    }, 900);
  };

  const startPayPal = async () => {
    try {
      setProcessing(true);
      const courseId = course?._id;
      if (!courseId) {
        throw new Error("This course is not available for PayPal checkout.");
      }
      const res = await axiosClient.post("/orders/create", { courseId });
      const approveLink = res?.data?.approveLink;
      if (!approveLink) {
        throw new Error("Failed to start PayPal checkout.");
      }

      const ctx = {
        course,
        localOrderId: res?.data?.localOrderId,
        orderId: res?.data?.orderId,
        currency: res?.data?.currency,
        amount: res?.data?.amount,
        method: "paypal",
        ts: Date.now(),
      };
      try {
        localStorage.setItem("edtech_checkout_context", JSON.stringify(ctx));
      } catch {
        void 0;
      }

      window.location.href = approveLink;
    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Unable to start PayPal.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Checkout</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Complete your enrollment securely.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="border-b border-slate-200 dark:border-slate-800 p-3 flex gap-2">
                {[
                  { id: "upi", label: "UPI" },
                  { id: "card", label: "Card" },
                  { id: "paypal", label: "PayPal" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`h-9 px-3 rounded-lg text-sm font-medium border transition ${
                      tab === t.id
                        ? "bg-blue-600 border-blue-700 text-white"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === "upi" ? (
                <div className="p-5 space-y-5">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Choose UPI app</div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "gpay", label: "Google Pay" },
                        { id: "phonepe", label: "PhonePe" },
                        { id: "amazonpay", label: "Amazon Pay" },
                      ].map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setUpiApp(app.id)}
                          className={`h-12 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition ${
                            upiApp === app.id
                              ? "border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950"
                          }`}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Enter UPI ID</div>
                    <input
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                      placeholder="example@upi"
                      className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                    <p className="mt-1 text-xs text-slate-500">We'll send a collect request to your chosen app.</p>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/40">
                    <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Secure</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Your payment is processed using an encrypted channel. For demo purposes, we simulate payment confirmation.</p>
                  </div>
                </div>
              ) : tab === "card" ? (
                <div className="p-5 space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input className="h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950" placeholder="Card Number" />
                    <input className="h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950" placeholder="Name on Card" />
                    <input className="h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950" placeholder="MM/YY" />
                    <input className="h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950" placeholder="CVV" />
                  </div>
                  <p className="text-xs text-slate-500">Cards are for demo only. No real charges.</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/40">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Pay securely with PayPal
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      You'll be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                Back
              </button>
              <button
                onClick={tab === "paypal" ? startPayPal : mockPay}
                disabled={processing || (tab === "upi" && !vpa.trim())}
                className="h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow disabled:opacity-60"
              >
                {processing
                  ? "Processing…"
                  : tab === "paypal"
                    ? "Continue to PayPal"
                    : `Pay ₹${totals.total} & Enroll`}
              </button>
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {course.bannerImg ? (
                    <img src={course.bannerImg} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">{course.banner || course.title?.slice(0, 2)}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Course</div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{course.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{course.instructor}</div>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Order ID</span><span className="font-medium">{checkoutCtx?.localOrderId || "-"}</span></div>
                <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Amount</span><span className="font-medium">₹{totals.total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Method</span><span className="font-medium">{tab ? tab.toUpperCase() : "-"}</span></div>
                <div className="border-t border-slate-200 dark:border-slate-800 my-2" />
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span>₹{totals.total.toFixed(2)}</span></div>
              </div>

              <div className="mt-4 text-xs text-slate-500">By continuing, you agree to our Terms and Refund Policy.</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
