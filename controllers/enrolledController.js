const Enrolled = require("./../models/enrolledModel");
const factory = require("./handlerFactory");

exports.createEnrolled = async (req, res, next) => {
  const enrolled = await Enrolled.create({ ...req.body, user: req.id });
  res.status(200).json({
    status: "Success",
    data: { enrolled },
  });
};

exports.getAllEnrolled = factory.getAll(Enrolled);
exports.getEnrolled = factory.getOne(Enrolled);
// exports.createEnrolled = factory.createOne(Enrolled);
exports.updateEnrolled = factory.updateOne(Enrolled);
exports.deleteEnrolled = factory.deleteOne(Enrolled);
