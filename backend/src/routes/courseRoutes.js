const express = require('express');
const { getCourses, getCourseBySlug, getSingleCourse, addCourse, seedCourses } = require('../controllers/courseController');

const router = express.Router();

router.get('/', getCourses);
router.get('/slug/:slug', getCourseBySlug);
router.get('/:id', getSingleCourse);

router.post("/add", addCourse)

// One-time seeding endpoint for static frontend courses
router.post('/seed', seedCourses)

module.exports = router;
