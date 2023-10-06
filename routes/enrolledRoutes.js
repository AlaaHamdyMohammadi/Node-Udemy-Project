const express = require("express");
const enrolledController = require("./../controllers/enrolledController");
const authController = require("./../controllers/authController");

const enrolledRoute = express.Router();

enrolledRoute
  .route("/")
  .get(authController.protect, enrolledController.getAllEnrolled)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    enrolledController.createEnrolled
  );

enrolledRoute
  .route("/:id")
  .get(enrolledController.getEnrolled)
  .patch(enrolledController.updateEnrolled)
  .delete(enrolledController.deleteEnrolled);

module.exports = enrolledRoute;
