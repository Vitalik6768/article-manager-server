const express = require("express");
const articleControllers = require("../controllers/articleControllers");
const { upload, verifyToken } = require("../midleware/midlewareFunc");
const router = express.Router();

// @route GET && POST - /posts/
router
  .route("/newArticle/")
  .post(articleControllers.createNewArticle)

router.route("/:id/user/:userId").put(verifyToken, articleControllers.updateArticleById);
router.route("/:id/status/:userId").put(verifyToken, articleControllers.updateArticleStatus);
router.route("/:month/user/:userId").get(verifyToken, articleControllers.getArticlesByMonth);
router.route("/user/:userId").get(verifyToken, articleControllers.getAllArticles);
module.exports = router;

