const Course = require("./../models/courseModel");
const multer = require("multer");
const sharp = require("sharp");
const factory = require("./handlerFactory");

// const multerStorage = multer.diskStorage({
//   // destination is a callback function
//   destination: (req, file, cb) => {
//     //null => Means not have an error
//     cb(null, "public/img/courses");
//   },
//   filename: (req, file, cb) => {
//     //const content = req.user.id;
//     const extention = file.mimetype.split("/")[1];
//     console.log(file.mimetype);
//     cb(null, `course-${req.params.id}-${Date.now()}.${extention}`);
//   },
// });
//-${req.params.id}

const multerStorage = multer.memoryStorage();
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
//-${req.params.id}
exports.resizeCoursePhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `course-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(700, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/courses/${req.file.filename}`);

  next();
};

// exports.getAllCourse = async (req, res) => {
//   try {
//     let filterObj = {};
//     if (req.params.subCategoryId) {
//       filterObj = {
//         subCategory: req.params.subCategoryId,
//       };
//     }else if(req.params.instructorId){
//       filterObj = {
//         instructorId: req.params.instructorId,
//       };
//     }else if(req.params.categoryId){
//       filterObj = {
//         categoryId: req.params.categoryId,
//       };
//     }
//     const courses = await Course.find(filterObj);
//     res.status(200).json({
//       status: "Success",
//       results: courses.length,
//       data: { courses },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

exports.getAllCourse = async (req, res) => {
  try {
    // Combine URL parameters and query parameters into a single filter object
    const filterObj = { ...req.query };

    if (req.params.subCategoryId) {
      filterObj.subCategory = req.params.subCategoryId;
    }

    if (req.params.instructorId) {
      filterObj.instructorId = req.params.instructorId;
    }

    if (req.params.categoryId) {
      filterObj.categoryId = req.params.categoryId;
    }

    // Rest of the code for filtering, sorting, pagination, and limiting
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((e) => delete filterObj[e]);
 
    console.log("first",filterObj);

    let queryStr = JSON.stringify(filterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log("second",filterObj);


    let sort = "-createdAt";
    if (req.query.sort) {
      sort = req.query.sort;
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 15;
    const skip = (page - 1) * limit;

    const courses = await Course.find(JSON.parse(queryStr))
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments(JSON.parse(queryStr));

    res.status(200).json({
      status: "Success",
      results: courses.length,
      totalCourses,
      data: { courses },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
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
      const photo = req.file.filename;
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

exports.createCourse = async (req, res) => {
  console.log(req)
  try {
    // if (!req.file) {
    //   return res.status(400).json({
    //     status: "Failed",
    //     message: "No file uploaded. Please upload a file.",
    //   });
    // }
    
    //const photo = req.file.filename;
    const newCourse = await Course.create({
      ...req.body,
      instructorId: req.id,
      //photo,
    });
    //console.log(photoPath)
    res.status(201).json({
      status: "Success",
      data: newCourse,
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err.message,
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

//exports.getAllCourse = factory.getAll(Course);
//exports.getCourse = factory.getOne(Course);
//exports.createCourse = factory.createOne(Course);
//exports.deleteCourse = factory.deleteOne(Course);
