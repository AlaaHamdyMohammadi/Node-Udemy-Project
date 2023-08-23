const express = require("express");
const courseController = require("./../controllers/courseController");
const authController = require("./../controllers/authController");

const courseRouter = express.Router();
 
courseRouter
  .route("/")
  .get(authController.protect, courseController.getAllCourse)
  .post(
    // authController.restrictTo("instructor", "admin"),
    courseController.createCourse
  ); //authController.restrictTo("instructor", "admin"),
courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.uploadCoursePhoto ,courseController.updateCourse)
  .delete(
    authController.protect,
    authController.restrictTo("instructor", "admin"), //passed role that allawed to interact with this resource (return middleware)
    courseController.deleteCourse
  );

module.exports = courseRouter;
