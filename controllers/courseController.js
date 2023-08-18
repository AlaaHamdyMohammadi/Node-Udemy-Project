const Course = require("./../models/courseModel");

exports.getAllUCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: "Success",
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    // console.log(req.body);
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: "Success",
      data: newCourse,
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }

  // console.log(req.body);
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    //Not send back any data to the client
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};
