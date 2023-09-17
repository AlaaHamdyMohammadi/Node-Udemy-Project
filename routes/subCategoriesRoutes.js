const express = require("express");
const subCategoryController = require("./../controllers/subCategories");
const authController = require("./../controllers/authController");

//{mergeParams: true}
const subCategoryRoute = express.Router({ mergeParams: true });

subCategoryRoute
  .route("/")
  .get(subCategoryController.getAllsubCategories) //protect?
  .post(subCategoryController.createsubCategories); //admin

subCategoryRoute
  .route("/:id")
  .get(subCategoryController.getsubCategories)
  .patch(subCategoryController.updatesubCategories) //admin
  .delete(subCategoryController.deletesubCategories); //admin

module.exports = subCategoryRoute;
