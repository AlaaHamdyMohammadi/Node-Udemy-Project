const multer = require("multer");
const sharp = require("sharp");
const User = require("./../models/userModel");
const factory = require('./handlerFactory');

//In image processing after uploading the file, the best to save it in memory(the image will then stored as a buffer)
const multerStorage = multer.memoryStorage();

//This function to test if the uploaded file is an image or not
const multerFilter = (req, file, cb) => {
  //mimetype always contain image word to check
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

//Images are not directly uploaded into the db, just upload them into file system, and then in db we put a link to that image.
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  
  next();  
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    // console.log(req.body);
    const newUser = await User.create({
      ...req.body,
      enrolledCourses: req.user.id,
    });
    res.status(201).json({
      status: "Success",
      data: newUser,
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    const { id } = req.params;

    if (req.file) {
      
      // const photo = req.file.path;
      const photo = req.file.originalname;
      console.log(req.file);
      const user = await User.findByIdAndUpdate(
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
          user,
        },
      });
      //console.log(req.file.filename);
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);