const Course = require("./../models/courseModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  // destination is a callback function
  destination: (req, file, cb) => {
    //null => Means not have an error
    cb(null, "public/img/courses");
  },
  filename: (req, file, cb) => {
    //const content = req.user.id;
    const extention = file.mimetype.split("/")[1];
    cb(null, `user-${req.params.id}-${Date.now()}.${extention}`);
    //cb(null, `user-${file.originalname}-${Date.now()}.${extention}`);
  },
});

const multerFilter = (req, file, cb) => {
  //mimetype always contain image word to check
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCoursePhoto = upload.single("photo");

exports.getAllCourse = async (req, res) => {
  try {
    const page = req.query.p || 1;
    const numOfCourses = 3;
    const count = await Course.countDocuments({})
    const maxPage = Math.ceil(count / numOfCourses);

    if (page > maxPage) {
      return res.status(400).json({
        status: "Faild",
        message: "Invalid page number",
      });
    }
    //filteration
    const queryObj = { ...req.query };
    delete queryObj.p;
    const courses = await Course.find(queryObj)
      .skip((page - 1) * numOfCourses) //pagination
      .limit(numOfCourses);
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
    const { id } = req.params;

    if (req.file) {
      const photo = req.file.path;
      console.log(req.file);
      const course = await Course.findByIdAndUpdate(
        id,
        { photo, ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        status: "Success",
        data: {
          course,
        },
      });
      
    }

    const course = await Course.findByIdAndUpdate(id, req.body, {
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
