const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: {
    type: String,
  },
  // video: {
  //   type: String, 
  //   required: true,
  // }, 
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'SubCategories',
  }
});

courseSchema.pre(/^find/, function(next){
  this.populate({ path: "subCategory", select: "name" });
  next();
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
