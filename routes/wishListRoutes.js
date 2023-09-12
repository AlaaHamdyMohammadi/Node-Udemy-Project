const express = require("express");
const wishListController = require("./../controllers/wishListController");
const authController = require("./../controllers/authController");

const wishListRoute = express.Router();

wishListRoute
  .route("/")
  .get(wishListController.getAllWishLists)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    wishListController.createWishList
  );

wishListRoute
  .route("/:id")
  .get(wishListController.getWishList)
  .patch(wishListController.updateWishList)
  .delete(wishListController.deleteWishList);

module.exports = wishListRoute;
