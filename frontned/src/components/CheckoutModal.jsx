import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

export default function CheckoutModal({ open, onClose, course, onEnrolled }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  if (!open || !course) return null;

  const base = course.price;
  const discount = coupon.trim().toUpperCase() === "SAVE20" ? base * 0.2 : 0;
  const subtotal = Math.max(0, base - discount);
  const tax = +(subtotal * 0.18).toFixed(2); // 18% GST as example
  const total = +(subtotal + tax).toFixed(2);

  const handleClose = () => {
    setCoupon("");
    setMethod("upi");
    setProcessing(false);
    onClose?.();
  };

  const handleConfirm = async () => {
    if (!user) return;
    try {
      setProcessing(true);
      // Simulate enrollment success and save to localStorage
      const key = `edtech_enrollments_${user.email || user.id || "guest"}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      if (!existing.includes(course.id)) existing.push(course.id);
      localStorage.setItem(key, JSON.stringify(existing));
      setTimeout(() => {
        setProcessing(false);
        handleClose();
        onEnrolled?.();
        navigate(`/syllabus`, { state: { course } });
      }, 800);
    } catch (e) {
      setProcessing(false);
      console.error(e);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative w-full max-w-2xl rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="p-5 md:p-6 border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
                {course.bannerImg ? (
                  <img src={course.bannerImg} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">{course.banner}</div>
                )}
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Course</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{course.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{course.instructor}</div>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Coupon</label>
              <div className="mt-1 flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter code (try SAVE20)"
                  className="flex-1 h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  className="h-10 px-3 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  onClick={() => setCoupon(coupon.trim())}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payment Method</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "upi", label: "UPI" },
                  { id: "card", label: "Credit/Debit Card" },
                  { id: "netbanking", label: "Netbanking" },
                  { id: "wallet", label: "Wallet" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`h-10 rounded-lg border text-sm ${
                      method === m.id
                        ? "border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Course price</span><span className="font-medium">${base.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Discount</span><span className="font-medium text-emerald-600">-{discount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">GST (18%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <div className="border-t border-slate-200 dark:border-slate-800 my-2" />
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            {!user ? (
              <div className="mt-6 space-y-2">
                <div className="text-sm text-slate-600 dark:text-slate-300">You need an account to enroll and save your progress.</div>
                <div className="flex gap-2">
                  <button onClick={() => navigate('/login')} className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Login</button>
                  <button onClick={() => navigate('/register')} className="h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-700">Create Account</button>
                </div>
                <button onClick={onClose} className="mt-2 text-sm text-slate-500">Maybe later</button>
              </div>
            ) : (
              <div className="mt-6">
                <button
                  onClick={handleConfirm}
                  disabled={processing}
                  className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow disabled:opacity-60"
                >
                  {processing ? 'Processing…' : `Pay ${total.toFixed(2)} & Enroll`}
                </button>
                <p className="mt-3 text-xs text-slate-500">
                  By enrolling, you agree to our Terms and Refund Policy. Secure payment simulated for demo.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
