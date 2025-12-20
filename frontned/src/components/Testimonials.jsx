import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Testimonials() {
  const MotionDiv = motion.div;
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Ashutosh Kumar",
        title: "Full‑Stack Developer",
        rating: 5,
        text: "The roadmap is clear, the projects are practical, and the mentor feedback actually helped me improve fast.",
      },
      {
        id: 2,
        name: "Nitya Singh",
        title: "Software Engineer",
        rating: 5,
        text: "I liked the cohort pace and weekly goals. The structured syllabus made it easier to stay consistent.",
      },
      {
        id: 3,
        name: "Ashish Gupta",
        title: "Frontend Engineer",
        rating: 4,
        text: "The doubt support and the project reviews were the best part. I shipped a portfolio project I’m proud of.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + data.length) % data.length);
  }, [data.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  const current = data[index];

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Testimonials
          </h2>
          <p className="text-slate-500 mt-2 mb-10">
            Hear from learners after finishing real projects.
          </p>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-200 to-purple-200 blur-md opacity-60" />
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={prev}
                className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <div className="text-xs text-slate-500">
                {index + 1} / {data.length}
              </div>
              <button
                type="button"
                onClick={next}
                className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {current.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {current.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {current.title}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-amber-500 text-sm">
                    {"★".repeat(current.rating)}
                    {"☆".repeat(5 - current.rating)}
                  </div>
                  <p className="mt-3 text-slate-700 leading-relaxed">
                    “{current.text}”
                  </p>
                </MotionDiv>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-center gap-2">
                {data.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index
                        ? "w-8 bg-blue-600"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
