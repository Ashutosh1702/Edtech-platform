const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },   // IIT JEE, NEET, Boards
    slug: { type: String, required: true, unique: true },
    type: { type: String, default: 'exam' },  // exam, board, govt, etc.
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
