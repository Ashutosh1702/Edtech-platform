import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  const handleInstructorClick = (e) => {
    e.stopPropagation();
    navigate(`/course/${course.id}`, { state: { course } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-slate-900 rounded-xl shadow-lg dark:shadow-black/20 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm overflow-hidden relative">
        {course.bannerImg ? (
          <img
            src={course.bannerImg}
            alt={course.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
            style={{
              objectPosition: course.instructor?.includes("Kiranpreet")
                ? "center top"
                : course.instructor?.includes("Ashutosh")
                ? "center 25%"
                : course.instructor?.includes("Nitya Singh")
                ? "center top"
                : course.instructor?.includes("Saket")
                ? "center top"
                : "center",
              imageRendering: "auto",
              WebkitImageRendering: "-webkit-optimize-contrast",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              willChange: "transform",
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              minHeight: "100%",
              minWidth: "100%",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = course.banner;
            }}
            onLoad={(e) => {
              e.target.style.opacity = "1";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg px-4 text-center">
            {course.banner}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2 uppercase tracking-wide">
          {course.tagline}
        </p>
        <h3
          onClick={handleCardClick}
          className="font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 cursor-pointer"
        >
          {course.title}
        </h3>
        <button
          onClick={handleInstructorClick}
          className="text-sm text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer text-left"
        >
          {course.instructor}
        </button>
        {course.subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 mt-1">
            {course.subtitle}
          </p>
        )}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center text-amber-500">
            <span className="text-base leading-none">
              {"★".repeat(course.rating)}
              {"☆".repeat(5 - course.rating)}
            </span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            ({course.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 dark:text-slate-500 text-sm line-through font-medium">
            ${(course.price * 1.2).toFixed(2)}
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-bold text-xl text-blue-600">
            ${course.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
