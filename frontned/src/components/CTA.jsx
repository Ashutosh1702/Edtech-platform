import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Join a cohort. Build real projects. Get hired faster.
        </h3>
        <p className="text-slate-500 mb-6">
          Clear syllabus, mentor support, and a structured path from beginner to
          job‑ready.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold"
          >
            Create free account
          </Link>
          <Link
            to="/courses"
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-2"
          >
            Learn more<span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
