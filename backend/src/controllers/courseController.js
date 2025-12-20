const Course = require('../models/Course');

const getCourses = async (req, res, next) => {
  try {
    console.log("this is course get all")
    const { category, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filter)/* .populate('category'); */
    console.log(courses)

    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// const getSingleCourse = async (req, res, next) => {
//   try {
//     const courseId = req.params.id;
//     console.log(courseId)
//     const course = await Course.findById(courseId).populate({     
//       path: "category",
//     })
//     if (!course) {
//       res.status(404);
//       return next(new Error("Course not found"));
//     }
//     return res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (error) {
//     res.status(500);
//     return next(new Error("Failed to fetch the course"));
//   }
// }

const getCourseBySlug = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'category'
    );

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
};

const getSingleCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate({
      path: "category",
    })
    if (!course) {
      res.status(404);
      return next(new Error("Course not found"));
    }
    return res.status(200).json(course);
  } catch (error) {
    return next(error);
  }
}

const addCourse = async (req, res, next) => {
  try {
    const { title, description, language, targetExam, price, category } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const newCourse = new Course({
      title,
      slug,
      description,
      language,
      targetExam,
      price,
      category,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.log(error)
    throw new Error("Failed to add course");
  }
}

const seedCourses = async (req, res, next) => {
  try {
    // Mirrors frontend CoursesGrid.jsx (originalCourses + newCourses)
    const items = [
      // originalCourses
      {
        title: 'Introduction to JavaScript',
        description: 'What is JavaScript — Build a solid JS foundation with real projects',
        language: 'English',
        targetExam: 'JavaScript • Web Foundations',
        price: 39.99,
      },
      {
        title: 'Advanced Python Programming',
        description: 'PYTHON Crash Course — Write production‑grade Python with clean code',
        language: 'English',
        targetExam: 'Python • Hands-on Programming',
        price: 67.99,
      },
      {
        title: 'Cloud Computing Essentials',
        description: 'Gemini Clone — Master core cloud services, pricing & architectures',
        language: 'English',
        targetExam: 'Cloud • Architecture & Services',
        price: 55.99,
      },
      {
        title: 'Cybersecurity Basics',
        description: 'Crypto Marketplace — Secure apps & cloud workloads from day one',
        language: 'English',
        targetExam: 'Security • Cloud & Network Basics',
        price: 59.49,
      },
      // newCourses
      {
        title: 'Advanced React',
        description: 'Advanced React — Scale React apps with hooks, patterns & performance',
        language: 'English',
        targetExam: 'React • Frontend Developer',
        price: 69.99,
      },
      {
        title: 'Java (Intermediate to Advanced) by Nitya Singh',
        description: 'Java Mastery — Master OOP, collections, concurrency & JVM internals',
        language: 'English',
        targetExam: 'Java • OOP & System Design',
        price: 64.99,
      },
      {
        title: 'Spring Boot Deep Dive',
        description: 'Spring Boot — Ship microservices faster with Spring Boot best practices',
        language: 'English',
        targetExam: 'Spring Boot • Microservices',
        price: 62.49,
      },
      {
        title: 'Node.js Professional Guide',
        description: 'Node.js — Design high‑performance REST APIs with Node & Express',
        language: 'English',
        targetExam: 'Node.js • Backend APIs',
        price: 59.99,
      },
      {
        title: 'MongoDB for Developers',
        description: 'MongoDB — Model data, index smartly & scale with MongoDB',
        language: 'English',
        targetExam: 'MongoDB • NoSQL Databases',
        price: 57.99,
      },
      {
        title: 'SQL Fundamentals to Advanced',
        description: 'SQL — Query like a pro—joins, windows & optimization',
        language: 'English',
        targetExam: 'SQL • Data Analysis & BI',
        price: 54.99,
      },
    ];

    const results = [];
    for (const it of items) {
      const slug = it.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const doc = await Course.findOneAndUpdate(
        { slug },
        { $set: { ...it, slug } },
        { upsert: true, new: true }
      );
      results.push(doc);
    }

    return res.status(200).json({ success: true, count: results.length, courses: results });
  } catch (error) {
    res.status(500);
    return next(new Error('Failed to seed courses'));
  }
};

module.exports = { getCourses, getCourseBySlug, getSingleCourse, addCourse, seedCourses,  };
