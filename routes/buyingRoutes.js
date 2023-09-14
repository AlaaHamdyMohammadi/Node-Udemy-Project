const express = require('express');
const buyingController = require("./../controllers/buyingController");
const authController = require("./../controllers/authController");

const buyingRouter = express.Router();
 
buyingRouter.get("/checkout-session/:courseID", authController.protect, buyingController.getCheckoutSession);


module.exports = buyingRouter;