const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");

const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(categoryController.getAllCategories) //protect? 
  .post(categoryController.createCategory); //admin

categoryRoute
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory) //admin
  .delete(categoryController.deleteCategory); //admin

module.exports = categoryRoute;  
