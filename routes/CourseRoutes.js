const express = require("express");
const courseController = require("./../controllers/courseController");
const authController = require("./../controllers/authController");

const courseRouter = express.Router({ mergeParams: true });
 
courseRouter
  .route("/") 
  .get(courseController.getAllCourse)
  .post(
    authController.protect,
    //authController.restrictTo("instructor", "admin"),
    courseController.uploadCoursePhoto,
    courseController.createCourse
  );   
courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.uploadCoursePhoto, courseController.updateCourse) //authController.protect, authController.restrictTo("instructor", "admin"),
  .delete(
    authController.protect,
    authController.restrictTo("instructor", "admin"), //passed role that allawed to interact with this resource (return middleware)
    courseController.deleteCourse
  );

module.exports = courseRouter;
