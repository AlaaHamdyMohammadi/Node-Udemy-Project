const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "WishList must belong to a course."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "WishList must belong to a user."],
  },
});

wishListSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "title" }).populate({
    path: "user",
    select: "username photo",
  });
  next();
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
