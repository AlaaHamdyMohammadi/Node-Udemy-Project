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
      results: enrolledCourses.length,
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

exports.searchCourses = async (req, res) => {
  try {
    // Extract the search query from the request parameters or query parameters
    const searchQuery = req.params.query || req.query.q;

    if (!searchQuery) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide a search query.",
      });
    }

    const courses = await Enrolled.find({
      course: { $regex: searchQuery, $options: "i" }, 
    });

    res.status(200).json({
      status: "Success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};


exports.getEnrolled = factory.getOne(Enrolled);
// exports.createEnrolled = factory.createOne(Enrolled);
exports.updateEnrolled = factory.updateOne(Enrolled);
exports.deleteEnrolled = factory.deleteOne(Enrolled);
