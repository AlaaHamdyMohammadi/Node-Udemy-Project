const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courses: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
  }, 
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categorySchema.pre(/^find/, function(next){
  this.populate({path: 'courses', select: '-__v'});
  next();
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;