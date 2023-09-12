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
  // users: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  // }
});

// courseSchema.pre(/^find/, function(next){
//   this.populate({ path: "users", select: '-__v' });
//   next();
// })

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
