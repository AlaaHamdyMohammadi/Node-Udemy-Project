const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");

const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRoute
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRoute;  
