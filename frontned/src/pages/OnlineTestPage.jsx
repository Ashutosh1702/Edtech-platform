import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import Framer Motion

const MotionDiv = motion.div;

export default function OnlineTestPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [started, setStarted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-xl border bg-white dark:bg-slate-900 p-8 text-center">
          <h2 className="text-xl font-semibold">No course selected</h2>
          <p className="mt-2 text-slate-600">Please select a course to start the test.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 h-10 px-4 rounded-lg bg-blue-600 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
            {course.bannerImg ? (
              <img src={course.bannerImg} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-500">
                {course.title?.slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{course.title} — Practice Test</h1>
            <p className="text-sm text-slate-600 mt-1">Instructor: {course.instructor}</p>
          </div>
        </div>

        {/* Body with Animation Container */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!started ? (
              <MotionDiv
                key="instructions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <InfoCard title="⏱ Duration" value="20 Minutes" />
                  <InfoCard title="📄 Questions" value="20 MCQs" />
                  <InfoCard title="🏆 Marks" value="100 Total" />
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800 p-5">
                  <h3 className="font-semibold mb-2">Instructions</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    <li>Each question has only one correct answer</li>
                    <li>No negative marking</li>
                    <li>Do not refresh or leave the page</li>
                    <li>Test will auto-submit when time ends</li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setStarted(true)}
                    className="h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-transform active:scale-95"
                  >
                    Start Test
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="h-11 px-6 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </MotionDiv>
            ) : (
              <MotionDiv
                key="test-area"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="text-center py-10"
              >
                <MotionDiv 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-5xl mb-3"
                >
                  🚀
                </MotionDiv>
                <h2 className="text-2xl font-bold">Test Environment Ready</h2>
                <p className="text-slate-600 mt-2">Your test engine is initializing...</p>

                <div className="mt-8 max-w-sm mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
                   <MotionDiv 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-blue-600"
                   />
                </div>

                <button
                  onClick={() => navigate("/syllabus", { state: { course } })}
                  className="mt-10 h-10 px-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  View Recommended Syllabus
                </button>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-4 text-center">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
