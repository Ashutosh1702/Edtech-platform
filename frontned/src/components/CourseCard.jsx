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

  const getImagePosition = () => {
    const inst = (course.instructor || "").toLowerCase();
    if (inst.includes("nimisha")) return "center 30%";
    if (inst.includes("kiranpreet")) return "center 28%";
    if (inst.includes("alok")) return "center 35%";
    if (inst.includes("avinash")) return "center 32%";
    if (inst.includes("ashutosh")) return "center 40%";
    if (inst.includes("nitya")) return "center 30%";
    if (inst.includes("saket")) return "center 30%";
    if (inst.includes("sunidhi")) return "center 30%";
    return "center 35%"; // sensible default that keeps faces visible
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
            alt={`${course.title} — ${course.instructor}`}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            style={{
              objectPosition: getImagePosition(),
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

        {/* Overlay CTA shown on hover/focus to make the card more interactive */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          aria-label={`View ${course.title}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"
        >
          <span className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-sm font-medium shadow-md text-slate-900 dark:text-slate-100">
            View course
          </span>
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Instructor avatar chip (bottom-left) — clickable and keyboard accessible */}
        {course.bannerImg && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInstructorClick(e);
            }}
            className="absolute left-4 bottom-4 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full shadow-sm hover:scale-105 focus:scale-105 transition-transform duration-200"
            aria-label={`Open courses by ${course.instructor}`}
          >
            <img
              src={course.bannerImg}
              alt={`${course.instructor} avatar`}
              className="h-8 w-8 rounded-full object-cover"
              style={{ objectPosition: getImagePosition() }}
              loading="lazy"
            />
            <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">
              {course.instructor.replace(/^by\s+/i, "")}
            </span>
          </button>
        )}
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
