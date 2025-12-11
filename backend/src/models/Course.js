const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    targetExam: { type: String },
    language: { type: String, default: 'Hindi' },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    thumbnailUrl: { type: String },
    features: [{ type: String }],
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
