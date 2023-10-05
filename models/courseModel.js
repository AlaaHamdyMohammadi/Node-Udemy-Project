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
  //   required: true, Beginners, All levels, Intermediate, Expert
  // },
  price: { type: Number, required: true },
  priceType: { type: String, required: true },
  BestSeller: { type: String },
  Level: { type: String },
  DiscountPrice: { type: Number },
  percentageDis: { type: Number },
  timeDis: { type: Number },
  rating: { type: Number, required: true },
  NumRating: { type: Number, required: true },
  duration: { type: Number, required: true },
  lectures: { type: Number, required: true },
  updated: { type: String },
  articles: { type: Number },
  exercises: { type: Number },
  resources: { type: Number },
  sections: { type: Number },
  ContentSection: { type: Array },
  NumStd: { type: Number },
  instructor: { type: String },
  learn: { type: Array },
  requirements: { type: Array  },
  content: {
    type: String,
    // required: true
  },
  // quantity: {type: Number}, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instructorId: { type: mongoose.Schema.ObjectId, ref: "User" },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "SubCategories",
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
});

//----------------------------------------------

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subTitle: { type: String, required: true },
//   description: { type: String, required: true },
//   photo: {
//     type: String,
//   },
//   // // video: {
//   // //   type: String,
//   // //   required: true,
//   // // },
//   price: { type: Number, required: true },
//   priceType: { type: String, required: true },
//   BestSeller: { type: String },
//   DiscountPrice: { type: Number },
//   percentageDis: { type: Number },
//   timeDis: { type: Number },
//   rating: { type: Number, required: true },
//   NumRating: { type: Number, required: true },
//   duration: { type: Number, required: true },
//   lectures: { type: Number, required: true },
//   updated: { type: String },
//   articles: { type: Number },
//   exercises: { type: Number },
//   resources: { type: Number },
//   sections: { type: Number },
//   NumStd: { type: Number },
//   instructor: { type: String, required: true },
//   // learn: { type: Array, required: true },
//   // requirements: { type: Array, required: true },
//   // ContentSection: { type: Array },
//   // Level: { type: String, required: true },

//   content: {
//     type: String,
//     // required: true
//   },
//   // instructorId: { type: mongoose.Schema.ObjectId, ref: "User" },
//   subCategory: {
//     type: mongoose.Schema.ObjectId,
//     ref: "SubCategories",
//   },
//   categoryId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Category",
//   },
// });

courseSchema.pre(/^find/, function (next) {
  this.populate({ path: "instructorId", select: "username" });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({ path: "subCategory", select: "name" });
  next();
});
courseSchema.pre(/^find/, function (next) {
  this.populate({ path: "categoryId", select: "name" });
  next();
}); 

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
