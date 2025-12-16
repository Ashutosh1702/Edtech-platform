import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OnlineTestPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [started, setStarted] = useState(false);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
          <h2 className="text-xl font-semibold">No course selected</h2>
          <p className="mt-2 text-slate-600">Please go back and select a course to take the test.</p>
          <div className="mt-4">
            <button onClick={() => navigate(-1)} className="h-10 px-4 rounded-lg bg-blue-600 text-white">Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
            {course.bannerImg ? (
              <img src={course.bannerImg} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">{course.banner || course.title?.slice(0,2)}</div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Practice Test — {course.title}</h1>
            <div className="text-sm text-slate-600 mt-1">Instructor: {course.instructor}</div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-slate-700">Take a short diagnostic test to assess your understanding and get a personalized study path.</p>
          {!started ? (
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStarted(true)} className="h-11 px-5 rounded-lg bg-emerald-600 text-white font-semibold">Start Test</button>
              <button onClick={() => navigate(-1)} className="h-11 px-5 rounded-lg border">Maybe later</button>
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-md border p-4 bg-slate-50 dark:bg-slate-800">This is a placeholder test runner. Integrate your quiz engine here and pass the `course` object for context.</div>
              <div className="mt-4">
                <button onClick={() => navigate('/syllabus', { state: { course } })} className="h-10 px-4 rounded-lg bg-blue-600 text-white">View Recommended Syllabus</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
