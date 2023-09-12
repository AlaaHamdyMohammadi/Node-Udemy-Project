const Review = require("./../models/reviewModel");
const factory = require('./handlerFactory');

exports.createReview = async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: "Success",
    data: { review },
  });
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
// exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
