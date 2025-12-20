import { courseDetails } from "../data/courseDetails";
import { useNavigate } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    instructor: "Nimisha Singh Ma'am",
    technologies: ["JavaScript", "Web Development", "DOM"],
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    instructor: "Kiranpreet Kaur Ma'am",
    technologies: ["Python", "OOP", "Advanced Programming"],
  },
  {
    id: 3,
    title: "Cloud Computing Essentials",
    instructor: "Alok Sir",
    technologies: ["AWS", "Cloud Architecture", "DevOps"],
  },
  {
    id: 4,
    title: "Cybersecurity Basics",
    instructor: "Avinash Sir",
    technologies: ["Security", "Network Security", "Cloud Security"],
  },
  {
    id: 101,
    title: "Advanced React",
    instructor: "Ashutosh Sir",
    technologies: ["React", "Hooks", "Performance"],
  },
  {
    id: 102,
    title: "Java (Intermediate to Advanced)",
    instructor: "Nitya Singh Ma'am",
    technologies: ["Java", "OOP", "JVM"],
  },
  {
    id: 103,
    title: "Spring Boot Deep Dive",
    instructor: "Saket Sir",
    technologies: ["Spring Boot", "Microservices", "REST APIs"],
  },
  {
    id: 104,
    title: "Node.js Professional Guide",
    instructor: "Saket Sir",
    technologies: ["Node.js", "Express", "Backend"],
  },
  {
    id: 105,
    title: "MongoDB for Developers",
    instructor: "Saket Sir",
    technologies: ["MongoDB", "NoSQL", "Database"],
  },
  {
    id: 106,
    title: "SQL Fundamentals to Advanced",
    instructor: "Sunidhi Ma'am",
    technologies: ["SQL", "Database", "Data Analysis"],
  },
];

function SyllabusPage() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    const course = allCourses.find((c) => c.id === courseId);
    if (course) {
      navigate(`/course/${courseId}`, { state: { course } });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
            Complete Course Syllabus
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore detailed syllabi for all our courses. Each course includes comprehensive modules, topics, and learning outcomes.
          </p>
        </div>

        {/* All Course Syllabi */}
        <div className="space-y-8">
          {allCourses.map((course) => {
            const details = courseDetails[course.id];
            if (!details) return null;

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {course.title}
                      </h2>
                      <p className="text-blue-100 font-medium">
                        by {course.instructor}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCourseClick(course.id)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      View Full Course →
                    </button>
                  </div>
                </div>

                {/* Course Description */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {details.description}
                  </p>
                </div>

                {/* Course Structure */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Course Structure
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {details.courseStructure.map((section, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">
                              {section.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {section.lectures} lectures • {section.duration}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                            Topics Covered:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {section.topics.map((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                {details.learningOutcomes && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      What You'll Learn
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {details.learningOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg"
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

                {/* Prerequisites & What's Included */}
                <div className="p-6 grid md:grid-cols-2 gap-6 border-t border-slate-200 dark:border-slate-700">
                  {details.prerequisites && (
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3">
                        Prerequisites
                      </h4>
                      <ul className="space-y-2">
                        {details.prerequisites.map((prereq, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                          >
                            <span className="text-blue-600 dark:text-blue-400 mt-1">
                              •
                            </span>
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {details.whatYouGet && (
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3">
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        {details.whatYouGet.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
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
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Choose any course and begin your journey to mastering new skills with our expert instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/courses")}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse All Courses
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SyllabusPage;



