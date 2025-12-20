import { useNavigate } from "react-router-dom";

function CourseFooter({ course, details }) {
  const navigate = useNavigate();

  const handleInstructorClick = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  if (!course) return null;
  const ratingValue = Number.isFinite(Number(course.rating))
    ? Number(course.rating)
    : null;
  const reviewsValue = Number.isFinite(Number(course.reviews))
    ? Number(course.reviews)
    : null;

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Instructor Spotlight Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Meet Your Instructor
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl p-8 hover:bg-slate-800 transition-colors">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <button
                  type="button"
                  className="flex-shrink-0"
                  onClick={handleInstructorClick}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 hover:border-blue-500 transition-colors">
                    {course.bannerImg ? (
                      <img
                        src={course.bannerImg}
                        alt={course.instructor}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: course.instructor?.includes(
                            "Kiranpreet"
                          )
                            ? "center top"
                            : course.instructor?.includes("Ashutosh")
                            ? "center 25%"
                            : course.instructor?.includes("Nitya Singh")
                            ? "center top"
                            : course.instructor?.includes("Saket")
                            ? "center top"
                            : "center",
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                        {course.instructor.charAt(0)}
                      </div>
                    )}
                  </div>
                </button>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {course.instructor}
                  </h4>
                  <p className="text-blue-400 mb-3 font-medium">
                    {course.subtitle || course.tagline}
                  </p>
                  {details?.instructorBio ? (
                    <p className="text-slate-300 leading-relaxed">
                      {details.instructorBio}
                    </p>
                  ) : (
                    <p className="text-slate-300 leading-relaxed">
                      Expert instructor with years of experience in{" "}
                      {course.title}. Dedicated to helping students master the
                      fundamentals and advance their skills.
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
                    {ratingValue != null && (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500 text-lg">
                          {"★".repeat(Math.max(0, Math.min(5, ratingValue)))}
                          {"☆".repeat(
                            Math.max(
                              0,
                              5 - Math.max(0, Math.min(5, ratingValue))
                            )
                          )}
                        </span>
                        {reviewsValue != null && (
                          <span className="text-slate-400 text-sm">
                            ({reviewsValue} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Information Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">
              Course Information
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">
                <span className="text-slate-300 font-medium">Course:</span>{" "}
                {course.title}
              </li>
              <li className="text-slate-400">
                <span className="text-slate-300 font-medium">Instructor:</span>{" "}
                {course.instructor}
              </li>
              <li className="text-slate-400">
                <span className="text-slate-300 font-medium">Rating:</span>{" "}
                {ratingValue != null
                  ? `${ratingValue}/5`
                  : "-"}
                {reviewsValue != null ? ` (${reviewsValue} reviews)` : ""}
              </li>
              <li className="text-slate-400">
                <span className="text-slate-300 font-medium">Price:</span> ₹
                {Number(course.price || 0).toFixed(2)}
              </li>
              {course.subtitle && (
                <li className="text-slate-400">
                  <span className="text-slate-300 font-medium">Category:</span>{" "}
                  {course.subtitle}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/courses")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/checkout", { state: { course } })}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Enroll Now
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">
              What's Included
            </h4>
            <ul className="space-y-2 text-sm">
              {(
                details?.whatYouGet || [
                  "Hands-on projects and assignments",
                  "Concept explanations with visuals",
                  "Community support",
                  "Lifetime access",
                ]
              )
                .slice(0, 4)
                .map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-400"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Related Topics */}
        {details?.courseStructure && (
          <div className="mb-12">
            <h4 className="font-bold text-white mb-4 text-lg text-center">
              Topics Covered
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {details.courseStructure.slice(0, 3).flatMap((section) =>
                section.topics.slice(0, 3).map((topic, index) => (
                  <span
                    key={`${section.title}-${index}`}
                    className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-colors"
                  >
                    {topic}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Social Links & Newsletter */}
        <div className="border-t border-slate-800 pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-4">Stay Connected</h4>
              <p className="text-sm text-slate-400 mb-4">
                Follow us for updates on new courses, tips, and exclusive offers
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Get Course Updates</h4>
              <p className="text-sm text-slate-400 mb-3">
                Subscribe to receive updates about this course and new content
              </p>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 text-center md:text-left">
              Copyright © 2024 MyEdTech. All Rights Reserved. | Course:{" "}
              {course.title}
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CourseFooter;


