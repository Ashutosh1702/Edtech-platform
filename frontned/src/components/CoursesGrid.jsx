import { useCallback, useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";
import nimishaImg from "../assets/nimisha.jpg";
import kiranpreetImg from "../assets/kiranpreet.jpg";
import alokImg from "../assets/alok.jpg";
import avinashImg from "../assets/avinash.jpg";
import ashutoshImg from "../assets/ashutosh.webp";
import nityaImg from "../assets/nitya.jpg";
import saketImg from "../assets/saket.png";
import sunidhiImg from "../assets/sunidhi.webp";

// Original courses (kept as-is)
const originalCourses = [
  {
    id: 1,
    banner: "What is JavaScript",
    tagline: "Build a solid JS foundation with real projects",
    title: "Introduction to JavaScript",
    instructor: "by Nimisha Singh Ma'am",
    subtitle: "JavaScript • Web Foundations",
    bannerImg: nimishaImg,
    rating: 4,
    reviews: 4,
    price: 39.99,
  },
  {
    id: 2,
    banner: "PYTHON Crash Course",
    tagline: "Write production‑grade Python with clean code",
    title: "Advanced Python Programming",
    instructor: "Kiranpreet Kaur Ma'am",
    subtitle: "Python • Hands-on Programming",
    bannerImg: kiranpreetImg,
    rating: 5,
    reviews: 5,
    price: 67.99,
  },
  {
    id: 3,
    banner: "Gemini Clone",
    tagline: "Master core cloud services, pricing & architectures",
    title: "Cloud Computing Essentials",
    instructor: "Alok Sir",
    subtitle: "Cloud • Architecture & Services",
    bannerImg: alokImg,
    rating: 5,
    reviews: 5,
    price: 55.99,
  },
  {
    id: 4,
    banner: "Crypto Marketplace",
    tagline: "Secure apps & cloud workloads from day one",
    title: "Cybersecurity Basics",
    instructor: "Avinash Sir",
    subtitle: "Security • Cloud & Network Basics",
    bannerImg: avinashImg,
    rating: 4,
    reviews: 3,
    price: 59.49,
  },
];

// New courses (added)
const newCourses = [
  {
    id: 101,
    banner: "Advanced React",
    tagline: "Scale React apps with hooks, patterns & performance",
    title: "Advanced React",
    instructor: "Ashutosh Sir",
    subtitle: "React • Frontend Developer",
    bannerImg: ashutoshImg,
    rating: 5,
    reviews: 12,
    price: 69.99,
  },
  {
    id: 102,
    banner: "Java Mastery",
    tagline: "Master OOP, collections, concurrency & JVM internals",
    title: "Java (Intermediate to Advanced) by Nitya Singh",
    instructor: "by Nitya Singh Ma'am",
    subtitle: "Java • OOP & System Design",
    bannerImg: nityaImg,
    rating: 5,
    reviews: 10,
    price: 64.99,
  },
  {
    id: 103,
    banner: "Spring Boot",
    tagline: "Ship microservices faster with Spring Boot best practices",
    title: "Spring Boot Deep Dive",
    instructor: "Saket Sir",
    subtitle: "Spring Boot • Microservices",
    bannerImg: saketImg,
    rating: 4,
    reviews: 9,
    price: 62.49,
  },
  {
    id: 104,
    banner: "Node.js",
    tagline: "Design high‑performance REST APIs with Node & Express",
    title: "Node.js Professional Guide",
    instructor: "Saket Sir",
    subtitle: "Node.js • Backend APIs",
    bannerImg: saketImg,
    rating: 5,
    reviews: 14,
    price: 59.99,
  },
  {
    id: 105,
    banner: "MongoDB",
    tagline: "Model data, index smartly & scale with MongoDB",
    title: "MongoDB for Developers",
    instructor: "Saket Sir",
    subtitle: "MongoDB • NoSQL Databases",
    bannerImg: saketImg,
    rating: 4,
    reviews: 11,
    price: 57.99,
  },
  {
    id: 106,
    banner: "SQL",
    tagline: "Query like a pro—joins, windows & optimization",
    title: "SQL Fundamentals to Advanced",
    instructor: "Sunidhi Ma'am",
    subtitle: "SQL • Data Analysis & BI",
    bannerImg: sunidhiImg,
    rating: 5,
    reviews: 13,
    price: 54.99,
  },
];

// Single combined array for slider
const courses = [...originalCourses, ...newCourses];

function CoursesGrid() {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atEdges, setAtEdges] = useState({ start: true, end: false });
  const [allowAuto, setAllowAuto] = useState(true);

  const scrollByCards = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstChild
      ? el.firstChild.getBoundingClientRect().width
      : 384;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  }, []);

  const tick = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollByCards(1);
    }
  }, [scrollByCards]);

  const startAuto = useCallback(() => {
    if (intervalRef.current) return;
    if (!allowAuto) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    intervalRef.current = setInterval(tick, 3000);
  }, [allowAuto, tick]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const updateActiveFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstChild;
    const cardWidth = first ? first.getBoundingClientRect().width : 384;
    const step = cardWidth + 24;
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(idx);
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setAtEdges({ start, end });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = () => updateActiveFromScroll();
    el.addEventListener("scroll", handler, { passive: true });
    updateActiveFromScroll();
    return () => el.removeEventListener("scroll", handler);
  }, [updateActiveFromScroll]);

  const goToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstChild;
    const cardWidth = first ? first.getBoundingClientRect().width : 384;
    const step = cardWidth + 24;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <p className="text-center text-sm text-slate-500 mb-3 uppercase tracking-wider font-medium">
          Trusted by learners from
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-10 md:mb-12">
          Learn from the best
        </h2>

        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Top instructors courses"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onFocus={() => {
            setAllowAuto(false);
            stopAuto();
          }}
          onBlur={() => {
            setAllowAuto(true);
            startAuto();
          }}
        >
          <button
            aria-label="Previous"
            onClick={() => scrollByCards(-1)}
            className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-slate-700 shadow hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 ${
              atEdges.start ? "opacity-40 cursor-not-allowed" : ""
            }`}
            disabled={atEdges.start}
            type="button"
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide focus:outline-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollByCards(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollByCards(-1);
              }
            }}
          >
            {courses.map((c) => (
              <div
                key={c.id}
                className="snap-start shrink-0 w-72 sm:w-80 md:w-96"
              >
                <CourseCard course={c} />
              </div>
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={() => scrollByCards(1)}
            className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-slate-700 shadow hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 ${
              atEdges.end ? "opacity-40 cursor-not-allowed" : ""
            }`}
            disabled={atEdges.end}
            type="button"
          >
            ›
          </button>
          <div
            className="mt-6 flex items-center justify-center gap-2"
            aria-label="Carousel pagination"
          >
            {courses.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={activeIndex === i}
                onClick={() => goToIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  activeIndex === i
                    ? "bg-blue-600 w-6"
                    : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesGrid;
