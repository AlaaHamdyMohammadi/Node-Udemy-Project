const Course = require("./../models/courseModel");
const multer = require("multer");
const factory = require('./handlerFactory');

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

exports.getAllCourse = async(req, res) => {
  try{
    let filterObj = {};
    if(req.params.subCategoryId) filterObj = { subCategory: req.params.subCategoryId };
    const courses = await Course.find(filterObj);
    res.status(200).json({
      status: "Success",
      results: courses.length,
      data: { courses },
    });
  }catch(err){
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
}

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
//console.log
//exports.getAllCourse = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.createCourse = factory.createOne(Course);
exports.deleteCourse = factory.deleteOne(Course);
