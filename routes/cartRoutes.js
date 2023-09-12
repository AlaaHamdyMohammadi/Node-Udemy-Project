const express = require("express");
const cartController = require('./../controllers/cartController');
const authController = require("./../controllers/authController");

const cartRoute = express.Router();

cartRoute
  .route("/")
  .get(cartController.getAllCarts)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    cartController.createCart
  );

cartRoute
  .route("/:id")
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = cartRoute;
