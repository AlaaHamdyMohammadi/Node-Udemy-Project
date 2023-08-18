const express = require("express");
const courseController = require("./../controllers/courseController");
//const authController = require("./../controllers/authController");

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(courseController.getAllUCourse)
  .post(courseController.createCourse);
courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = courseRouter;
