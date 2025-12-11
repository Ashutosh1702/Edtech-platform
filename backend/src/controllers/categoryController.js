const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
  try {
    const { search, type } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const categories = await Category.find(filter).sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      res.status(404);
      return next(new Error('Category not found'));
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, type, description } = req.body;
    if (!name) {
      res.status(400);
      return next(new Error('Name is required'));
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const exists = await Category.findOne({ slug });
    if (exists) {
      res.status(409);
      return next(new Error('Category with this name already exists'));
    }

    const category = await Category.create({ name, slug, type, description });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, description } = req.body;

    const updates = {};
    if (typeof name === 'string' && name.trim().length) {
      updates.name = name;
      updates.slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    if (typeof type === 'string') updates.type = type;
    if (typeof description === 'string') updates.description = description;

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!category) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404);
      return next(new Error('Category not found'));
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};

