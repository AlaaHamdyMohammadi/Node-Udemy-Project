const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: {
    type: String,
    default: "default.jpg",
  },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
