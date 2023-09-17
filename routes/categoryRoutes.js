const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");
const subCategoryRoutes = require('./subCategoriesRoutes'); 
const categoryRoute = express.Router();

categoryRoute.use("/:categoryId/subCategories", subCategoryRoutes);

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
