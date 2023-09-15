const express = require("express");
const subCategoryController = require("./../controllers/subCategories");
const authController = require("./../controllers/authController");

const subCategoryRoute = express.Router();

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
