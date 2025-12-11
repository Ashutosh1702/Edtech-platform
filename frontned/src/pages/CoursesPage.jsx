import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosClient.get("/courses");
        setCourses(res.data || []);
      } catch (err) {
        console.error(err);
        setCourses([]);
      }
    };
    load();
  }, []);

  const handleBuyNow = (course) => {
    // Prefer MongoDB id in URL; also pass full course to details page
    const id = course._id || course.id || "unknown";
    navigate(`/course/${id}`, { state: { course } });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">All Courses</h1>

        {courses.length === 0 && (
          <p className="text-slate-400 text-sm">
            Abhi koi course nahi hai. Backend me Course collection me data add karoge to yahan show hoga.
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {courses.map((course) => (
            <div
              key={course._id || course.slug || course.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col"
            >
              <h2 className="font-semibold mb-1">{course.title}</h2>
              <p className="text-xs text-slate-400 mb-2">
                {(course.language || "")}  {(course.targetExam || "")}
              </p>
              <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                {course.description}
              </p>
              <p className="text-lg font-bold mb-4">₹{course.price}</p>
              <button
                onClick={() => handleBuyNow(course)}
                className="mt-auto inline-flex items-center justify-center h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
