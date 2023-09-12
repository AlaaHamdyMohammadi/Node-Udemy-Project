const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "Cart must belong to a course."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Cart must belong to a user."],
  },
});

cartSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "title" }).populate({
    path: "user",
    select: "username photo",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
