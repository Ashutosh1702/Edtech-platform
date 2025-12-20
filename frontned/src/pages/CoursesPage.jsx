import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("popular");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/courses");
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const languageOptions = useMemo(() => {
    const set = new Set(
      courses.map((c) => String(c.language || "").trim()).filter(Boolean)
    );
    return ["all", ...Array.from(set)];
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = courses.filter((c) => {
      if (language !== "all" && String(c.language || "").trim() !== language) {
        return false;
      }
      if (!q) return true;
      const hay = `${c.title || ""} ${c.description || ""} ${c.targetExam || ""}`
        .toLowerCase()
        .trim();
      return hay.includes(q);
    });

    const sorted = [...base];
    if (sort === "price_low") {
      sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price_high") {
      sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }
    return sorted;
  }, [courses, language, query, sort]);

  const handleBuyNow = (course) => {
    // Prefer MongoDB id in URL; also pass full course to details page
    const id = course._id || course.id || "unknown";
    navigate(`/course/${id}`, { state: { course } });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Courses</h1>
            <p className="text-slate-400 text-sm mt-1">
              Search, filter, and pick a course that fits your goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-80">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (title, description, track)…"
                className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-11 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {languageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All languages" : opt}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <option value="popular">Recommended</option>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-slate-400 text-sm">
            No courses found. Try a different search or filter.
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-5 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-1/2 mt-3" />
                  <div className="h-3 bg-slate-800 rounded w-full mt-3" />
                  <div className="h-3 bg-slate-800 rounded w-11/12 mt-2" />
                  <div className="h-10 bg-slate-800 rounded mt-6" />
                </div>
              ))
            : filtered.map((course) => (
                <div
                  key={course._id || course.slug || course.title}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col hover:border-slate-700 hover:shadow-lg hover:shadow-black/20 transition-all"
                >
                  <h2 className="font-semibold mb-1 line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-xs text-slate-400 mb-2">
                    {(course.language || "")} {(course.targetExam || "")}
                  </p>
                  <p className="text-sm text-slate-300 line-clamp-3 mb-3">
                    {course.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-lg font-bold">
                      ₹{Number(course.price || 0).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleBuyNow(course)}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      View & Enroll
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
