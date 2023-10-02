const express = require("express");
const subCategoryController = require("./../controllers/subCategories");
const authController = require("./../controllers/authController");
const courseRoutes = require('./courseRoutes')
//{mergeParams: true}
const subCategoryRoute = express.Router({ mergeParams: true });

subCategoryRoute.use("/:subCategoryId/courses", courseRoutes);

subCategoryRoute
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("instructor", "admin"),
    subCategoryController.getAllsubCategories
  ) //protect?
  .post(
    authController.protect,
    authController.restrictTo("instructor", "admin"),
    subCategoryController.createsubCategories
  ); //admin

subCategoryRoute
  .route("/:id")
  .get(subCategoryController.getsubCategories)
  .patch(subCategoryController.updatesubCategories) //admin
  .delete(
    authController.protect,
    authController.restrictTo("instructor", "admin"),
    subCategoryController.deletesubCategories
  ); //admin

module.exports = subCategoryRoute;
