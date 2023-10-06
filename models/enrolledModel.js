const mongoose = require("mongoose");

const enrolledSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "Enrolled must belong to a course."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Enrolled must belong to a user."],
  },
  price: {type: Number, required: true},
});

enrolledSchema.pre(/^find/, function (next) {
  this.populate({ path: "course", select: "title" }).populate({
    path: "user",
    select: "username photo",
  });
  next();
});

const Enrolled = mongoose.model("Enrolled", enrolledSchema);

module.exports = Enrolled;
