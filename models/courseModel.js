const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: {
    type: String,
  }, 
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  }
});

courseSchema.pre(/^find/, function(next){
  this.populate({ path: "category", select: "-__v" });
  next();
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
