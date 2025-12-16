import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseDetails } from "../data/courseDetails";
import CourseFooter from "../components/CourseFooter";
import CheckoutModal from "../components/CheckoutModal";
import axiosClient from "../api/axiosClient";

function CourseDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const [ serverCourse, setServerCourse ] = useState(null);
  const course = state?.course;
  const details = course ? courseDetails[course.id] : null;

  const getImagePosition = () => {
    const inst = (course?.instructor || "").toLowerCase();
    if (inst.includes("nimisha")) return "center 40%";
    if (inst.includes("kiranpreet")) return "center 28%";
    if (inst.includes("alok")) return "center 35%";
    if (inst.includes("avinash")) return "center 32%";
    if (inst.includes("ashutosh")) return "center 40%";
    if (inst.includes("nitya")) return "center 30%";
    if (inst.includes("saket")) return "center 30%";
    if (inst.includes("sunidhi")) return "center 30%";
    return "center 35%";
  };

  useEffect(() => {
    if (!course) {
      navigate("/courses", { replace: true });
    }
  }, [course, navigate]);

  // If course came from frontend (no _id), resolve backend course by slug
  useEffect(() => {
    const resolveServerCourse = async () => {
      try {
        if (!course) return;
        // if already a valid MongoDB id, no need to resolve
        const id = course._id?.toString();
        if (id && id.length === 24) {
          setServerCourse(course);
          return;
        }
        const slug = course.title
          ?.toLowerCase()
          ?.trim()
          ?.replace(/\s+/g, '-')
          ?.replace(/[^a-z0-9-]/g, '');
        if (!slug) return;
        const res = await axiosClient.get(`/courses/${slug}`);
        if (res?.data?._id) {
          setServerCourse(res.data);
        }
      } catch (e) {
        console.warn('Failed to resolve server course by slug:', e);
      }
    };
    resolveServerCourse();
  }, [course]);


const handleEnroll = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("edtech_token");
    if (!token) {
      setLoading(false);
      return alert("Please login first.");
    }

    // Prefer resolved serverCourse, fallback to course from state
    const courseForCheckout = serverCourse || course;
    navigate("/checkout", { state: { course: courseForCheckout } });
  } catch (err) {
    console.error("Failed to start checkout:", err);
    const msg = err?.message || "Unable to open checkout.";
    alert(msg);
  } finally {
    setLoading(false);
  }
};


  if (!course) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {course.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-lg">
            {details?.description ||
              `Learn the essentials of ${
                course.title.split(" ")[0]
              } with hands-on guidance. Build real projects, master core concepts, and gain confidence to apply your skills professionally.`}
          </p>

          {details?.instructorBio && (
            <div className="mt-8 p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                About {course.instructor}
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {details.instructorBio}
              </p>
            </div>
          )}

          {details?.courseStructure && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Course Structure
              </h2>
              <div className="space-y-3">
                {details.courseStructure.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                        {section.title}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm">
                        {section.lectures} lectures • {section.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {section.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {details?.learningOutcomes && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {details.learningOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700 dark:text-slate-300">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {details?.prerequisites && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                {details.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Course Description
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300">
                {details?.description ||
                  `This course is designed to quickly get you productive with ${course.title}. You'll learn best practices, understand the ecosystem, and build confidence through hands-on exercises.`}
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
            <div className="h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                {course.bannerImg ? (
                  <img
                    src={course.bannerImg}
                    alt={`${course.title} — ${course.instructor}`}
                    className="w-full h-full"
                    style={{ objectFit: "cover", objectPosition: getImagePosition() }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm">
                    {course.banner}
                  </div>
                )}
                {/* Avatar chip to show instructor face clearly */}
                {course.bannerImg && (
                  <div className="absolute left-4 bottom-4 flex items-center gap-3 bg-white/90 dark:bg-slate-900/75 px-3 py-1 rounded-full shadow-sm">
                    <img
                      src={course.bannerImg}
                      alt={`${course.instructor} avatar`}
                      className="h-10 w-10 rounded-full object-cover"
                      style={{ objectPosition: getImagePosition() }}
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {course.instructor?.replace(/^by\s+/i, "")}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">Instructor</div>
                    </div>
                  </div>
                )}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 pt-3 pb-6">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 text-xs font-semibold px-2.5 py-1 rounded">
                  <span>{course.banner}</span>
                </div>
                <div className="mt-2 text-white text-sm font-medium opacity-90 line-clamp-1">
                  {course.tagline}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-rose-600 text-xs font-semibold">
                5 days left at this price!
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span>
                  {"★".repeat(course.rating)}
                  {"☆".repeat(5 - course.rating)}
                </span>
                <span>({course.reviews} ratings)</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-slate-400 dark:text-slate-500 line-through">
                  ${(course.price * 1.2).toFixed(2)}
                </span>
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  ${course.price.toFixed(2)}
                </span>
                <span className="text-emerald-600 text-sm font-semibold">
                  20% off
                </span>
              </div>
              <button
                onClick={handleEnroll}
                disabled={loading}
                aria-busy={loading}
                className={`mt-4 w-full h-11 rounded-lg text-white font-semibold shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 flex items-center justify-center ${
                  loading
                    ? "bg-blue-500 cursor-not-allowed opacity-80"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Enroll Now"
                )}
              </button>
              <div className="mt-5 text-slate-600 dark:text-slate-300 text-sm">
                <h3 className="font-semibold mb-3">What's included?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {(
                    details?.whatYouGet || [
                      "Hands-on projects and assignments",
                      "Concept explanations with visuals",
                      "Community support",
                      "Lifetime access",
                    ]
                  ).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <CourseFooter course={course} details={details} />
      {/* <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        course={course}
        onEnrolled={() => setCheckoutOpen(false)}
      /> */}
    </main>
  );
}

export default CourseDetailPage;
