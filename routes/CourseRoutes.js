const express = require("express");
const courseController = require("./../controllers/courseController");
const authController = require("./../controllers/authController");
const reviewRoutes = require("./reviewRoutes");

const courseRoute = express.Router({ mergeParams: true });

courseRoute.use("/:courseId/reviews", reviewRoutes);

courseRoute
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("instructor", "admin"),
    courseController.getAllCourse
  )
  .post(
    authController.protect,
    authController.restrictTo("instructor", "admin"),
    courseController.uploadCoursePhoto,
    courseController.resizeCoursePhoto,
    courseController.createCourse
  );
courseRoute
  .route("/:id")
  .get(courseController.getCourse)
  .patch(
    courseController.uploadCoursePhoto,
    courseController.resizeCoursePhoto,
    courseController.updateCourse
  ) //authController.protect, authController.restrictTo("instructor", "admin"),
  .delete(
    authController.protect,
    authController.restrictTo("instructor", "admin"), //passed role that allawed to interact with this resource (return middleware)
    courseController.deleteCourse
  );

module.exports = courseRoute;
