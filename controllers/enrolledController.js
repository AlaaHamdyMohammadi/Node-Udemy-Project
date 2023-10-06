const Enrolled = require("./../models/enrolledModel");
const factory = require("./handlerFactory");
 
exports.createEnrolled = async (req, res, next) => {
  const enrolled = await Enrolled.create({ ...req.body, user: req.id });
  res.status(200).json({
    status: "Success",
    data: { enrolled },
  });
};

exports.getAllEnrolled = async (req, res) => {
  try {
    const enrolledCourses = await Enrolled.find({
      user: req.id,
    });

    res.status(200).json({
      status: "success",
      enrolledCourses,
    });
  } catch (err) {
    console.error("Error fetching enrolled courses: ", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch enrolled courses",
    });
  }
};

exports.getEnrolled = factory.getOne(Enrolled);
// exports.createEnrolled = factory.createOne(Enrolled);
exports.updateEnrolled = factory.updateOne(Enrolled);
exports.deleteEnrolled = factory.deleteOne(Enrolled);
