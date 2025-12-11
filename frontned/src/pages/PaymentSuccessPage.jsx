import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccessPage() {
    const loc = useLocation();
    const nav = useNavigate();
    const params = new URLSearchParams(loc.search);
    const success = params.get("success") === "1" || params.get("status") === "COMPLETED";
    const orderId = params.get("orderId") || "";
    const amount = params.get("amount");
    const currency = params.get("currency");

    useEffect(() => {
        // Optional: could fetch more order details here if needed
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${success ? "bg-emerald-600/20" : "bg-rose-600/20"}`}>
                        <span className={`${success ? "text-emerald-400" : "text-rose-400"}`}>{success ? "✓" : "✕"}</span>
                    </div>
                    <h1 className="text-2xl font-bold">{success ? "Payment Successful" : "Payment Failed"}</h1>
                </div>

                <p className="mt-2 text-slate-400">
                    {success
                        ? "Your payment has been processed. A confirmation has been recorded."
                        : "We couldn't process your payment. You can try again or contact support."}
                </p>

                <div className="mt-6 grid gap-3 text-sm">
                    {orderId && (
                        <div className="flex justify-between border border-slate-800 rounded-lg p-3">
                            <span className="text-slate-400">Order ID</span>
                            <span className="font-mono">{orderId}</span>
                        </div>
                    )}
                    {(amount || currency) && (
                        <div className="flex justify-between border border-slate-800 rounded-lg p-3">
                            <span className="text-slate-400">Amount</span>
                            <span className="font-semibold">{currency || "USD"} {amount || "-"}</span>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex gap-3">
                    <button onClick={() => nav("/courses")} className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Browse Courses</button>
                    <button onClick={() => nav("/")} className="h-10 px-4 rounded-lg border border-slate-700">Go Home</button>
                </div>
            </div>
        </div>
    );
}
