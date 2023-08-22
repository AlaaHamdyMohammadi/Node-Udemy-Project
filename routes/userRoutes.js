const express = require("express");
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');



const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.post("/forgetPassword", authController.forgetPassword);
//userRouter.patch("/resetPassword/:token", authController.resetPassword); 

//userController.uploadUserPhoto

userRouter.post('/upload',userController.uploadUserPhoto, (req, res) => {
    res.status(200).json({message: 'Image uploaded'})
}) 

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.uploadUserPhoto, userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.uploadUserPhoto, userController.updateUser)
  .delete(userController.deleteUser);


module.exports = userRouter;