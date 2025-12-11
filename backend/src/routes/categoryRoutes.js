const express = require('express');
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// Create
router.post('/add', createCategory);

// Update
router.put('/update/:id', updateCategory);

// Delete
router.delete('/delete/:id', deleteCategory);

// List all
router.get('/', getCategories);

// Get one by slug (keep last to avoid conflicts)
router.get('/:slug', getCategoryBySlug);

module.exports = router;

