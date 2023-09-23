const Review = require("./../models/reviewModel");
const factory = require('./handlerFactory');



exports.getAllReviews = async (req, res) => {
  try {
    let filterObj = {};
    if (req.params.courseId) {
      filterObj = {
        course: req.params.courseId,
      };
    } 
    const reviews = await Review.find(filterObj);
    res.status(200).json({
      status: "Success",
      results: reviews.length,
      data: { reviews },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.createReview = async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: "Success",
    data: { review },
  });
};

//exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
// exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
