const Review = require("./../models/reviewModel");
const factory = require('./handlerFactory');

exports.getAllReviews = async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { reviews },
  });
};

// exports.createReview = async (req, res, next) => {
//   const review = await Review.create(req.body);
//   res.status(200).json({
//     status: "Success",
//     data: { review },
//   });
// };

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
