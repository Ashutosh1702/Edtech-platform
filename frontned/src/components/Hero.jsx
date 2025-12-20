import { Link } from "react-router-dom";

function Stat({ value, label }) {
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl font-extrabold group-hover:text-blue-400 transition-colors duration-300 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs md:text-sm text-slate-400 mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Enhanced background effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Enhanced copy section */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm text-blue-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-2 shadow-lg backdrop-blur-sm animate-fade-in">
            <span className="text-lg">🚀</span>
            <span className="font-semibold">
              New: Winter Cohort admissions open
            </span>
          </span>

          <h1 className="hero-title text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Learn anything.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Grow your career.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
            Live cohorts, doubt support, and industry-grade projects. Join
            <span className="text-blue-400 font-semibold">
              {" "}
              thousands of learners{" "}
            </span>
            leveling up with our expertly designed courses.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/courses" className="btn-primary flex items-center justify-center gap-2">
              <span>Explore courses</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              to="/register"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Join free</span>
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </Link>
          </div>

          {/* Enhanced stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <Stat value="120+" label="Expert mentors" />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <Stat value="35k+" label="Active learners" />
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <Stat value="4.8/5" label="Avg rating" />
            </div>
          </div>
        </div>

        {/* Enhanced featured course card */}
        <div className="relative">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

            <div className="relative rounded-3xl border-2 border-white/20 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300">
                  ⭐ Featured course
                </span>
              </div>

              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.4),transparent_60%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.3),transparent_55%)]"></div>
                <div className="relative z-10 text-center p-6">
                  <div className="text-lg font-semibold text-white mb-2">
                    Full‑Stack Web Development
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {["Next.js", "Node", "MongoDB", "Deploy"].map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400 text-base">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-slate-400 text-sm">
                    (1,254 reviews)
                  </span>
                </div>
                <Link
                  to="/syllabus"
                  className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors"
                >
                  <span>View syllabus</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Enhanced notification badge */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md border-2 border-white/20 rounded-2xl px-5 py-3 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 text-white">
                <span className="text-lg animate-pulse">🔔</span>
                <div>
                  <div className="text-xs text-blue-100 font-medium">
                    Next live session
                  </div>
                  <div className="text-sm font-bold">Sun 7 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
