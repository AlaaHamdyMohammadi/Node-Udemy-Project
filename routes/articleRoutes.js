const express = require("express");
const articles = require("../controllers/articleController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get(
  "/",
  authController.restrictTo("instructor", "admin"),
  articles.getAllArticles
);
router.post(
  "/create",
  authController.restrictTo("admin"),
  articles.createArticle
);
router.get(
  "/details/:id",
  authController.restrictTo("instructor", "admin"),
  articles.getArticleById
);
router.patch(
  "/:id",
  authController.restrictTo("admin"),
  articles.updateArticle
);
router.delete(
  "/:id",
  authController.restrictTo("admin"),
  articles.deleteArticle
);

module.exports = router;
