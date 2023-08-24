const express = require("express");
const articles = require("../controllers/articleController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get(
  "/",
  authController.protect,
  authController.restrictTo("instructor", "admin"),
  articles.getAllArticles
);
router.post(
  "/create",
  authController.protect,
  authController.restrictTo("admin"),
  articles.createArticle
);
router.get(
  "/details/:id",
  authController.protect,
  authController.restrictTo("instructor", "admin"),
  articles.getArticleById
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  //articles.uploadArticlePhoto,
  articles.updateArticle
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  articles.deleteArticle
);


module.exports = router;
