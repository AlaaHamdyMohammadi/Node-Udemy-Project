const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  photo: {
    type: String,
  },
  // video: {
  //   type: String,
  //   required: true,
  // },
  price: { type: Number, required: true },
  DiscountPrice: { type: Number },
  percentageDis: { type: Number },
  timeDis: { type: Number },
  rating: { type: Number, required: true },
  NumRating: { type: Number, required: true },
  duration: { type: Number, required: true },
  lectures: { type: Number, required: true },
  updated: { type: String, required: true },
  articles: { type: Number },
  exercises: { type: Number },
  resources: { type: Number },
  sections: { type: Number },
  ContentSection: { type: Array },
  NumStd: { type: Number, required: true },
  //relation
  instructor: { type: String, required: true },
  learn: { type: Array, required: true },
  requirements: { type: Array, required: true },
  content: {
    type: String,
    // required: true
  },
  instructorId: { type: mongoose.Schema.ObjectId, ref: "User" },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "SubCategories",
  },
});

courseSchema.pre(/^find/, function (next) {
  this.populate({ path: "instructorId", select: "username" });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({ path: "subCategory", select: "name" });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
