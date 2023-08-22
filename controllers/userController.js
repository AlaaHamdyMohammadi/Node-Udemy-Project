const User = require("./../models/userModel");
const multer = require("multer");


const multerStorage = multer.diskStorage({
  // destination is a callback function
  destination: (req, file, cb) => {
    //null => Means not have an error
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    //const content = req.user.id;
    const extention = file.mimetype.split('/')[1];
    cb(null, `user-${req.params.id}-${Date.now()}.${extention}`);
    //cb(null, `user-${file.originalname}-${Date.now()}.${extention}`);
  }
});

//This function to test if the uploaded file is an image or not
const multerFilter = (req, file, cb) => {
  //mimetype always contain image word to check
  if(file.mimetype.startsWith('image')){
    cb(null, true);
  }else{
    cb('Not an image! Please upload only images.', false);
  }
}

//Images are not directly uploaded into the db, just upload them into file system, and then in db we put a link to that image.
// const upload = multer({dest: 'public/img/users'});
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    // console.log(req.body);
    const newUser = await User.create(req.body);
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

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses');
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

  // console.log(req.body);
};

exports.updateUser = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    const { id } = req.params;

    if (req.file) {
      // let user = await User.findById(id);
      // console.log("Test1");
      // if (!user) {
      //   return res.status(404).json({
      //     status: "Failed",
      //     message: "User not found",
      //   });
      // }

      const photo = req.file.path;
      // await User.findByIdAndUpdate(id, {photo});
      const user = await User.findByIdAndUpdate(id, { photo, ...req.body },{
      new: true,
      runValidators: true,
    });
    console.log('working 1')
      return res.status(200).json({
        status: "Success",
        data: {
          user,
        },
      });
      // console.log(req.file.path);
      // console.log("Test2");
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

exports.deleteUser = async (req, res) => {
  try {
    //Not send back any data to the client
    await User.findByIdAndDelete(req.params.id);
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
