const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Review must belong to a tour."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user."],
    },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "title" }).populate({
    path: "user",
    select: "username photo",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
