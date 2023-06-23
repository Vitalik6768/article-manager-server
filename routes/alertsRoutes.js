const express = require("express");
const alertsControllers = require("../controllers/alertsControllers");
const router = express.Router();

// @route GET && POST - /posts/
router.route("/:userId").get(alertsControllers.getAllArticles)
router.route("/:id/update/:userId").put(alertsControllers.updateArticleById);
module.exports = router;

