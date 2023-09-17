//User Collection
/*
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


// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       status: "Success",
//       results: users.length,
//       data: {
//         users,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     //.populate("enrolledCourses")
//     const user = await User.findById(req.params.id);
//     res.status(200).json({
//       status: "Success",
//       data: {
//         user, 
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }

//   // console.log(req.body);
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     //Not send back any data to the client
//     await User.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "Success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

*/

//Course Collection
/*

exports.createCourse = async (req, res) => {
  try {
    // console.log(req.body);
    // req.body.userId = userId;
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

// exports.getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     res.status(200).json({
//       status: "Success",
//       data: {
//         course,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }

//   // console.log(req.body);
// };

// exports.deleteCourse = async (req, res) => {
//   try {
//     //Not send back any data to the client
//     await Course.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "Success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

*/

//Review Collection
/*
// exports.getAllReviews = async (req, res, next) => {
//   const reviews = await Review.find();
//   res.status(200).json({
//     status: "Success",
//     results: reviews.length,
//     data: { reviews },
//   });
// };

// exports.createReview = async (req, res, next) => {
//   const review = await Review.create(req.body);
//   res.status(200).json({
//     status: "Success",
//     data: { review },
//   });
// };
*/

//Category Collection
/*
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({
//       status: "Success",
//       results: categories.length,
//       data: { categories },
//     }); 
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

// exports.getCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.status(200).json({
//       status: "Success",
//       data: { category },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

// exports.createCategory = async (req, res) => {
//   try {
//     const newCategory = await Category.create(req.body);
//     res.status(200).json({
//       status: "Success",
//       data: { newCategory },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     req.status(200).json({
//         status: 'Success',
//         data: {category}
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };

// exports.deleteCategory = async(req, res) => {
//     try{
//         const category = await Category.findByIdAndDelete(req.params.id);
//         res.status(200).json({
//             status: 'Success',
//             data: null,
//         });
//     }catch(err){
//         res.status(404).json({
//           status: "Faild",
//           message: err,
//         });
//     }
// };
 

*/