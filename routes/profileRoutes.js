const express = require("express");
const profileController = require('../controllers/profileControllers');
const { upload, verifyToken } = require("../midleware/midlewareFunc");


const router = express.Router();

//router.get("/", profileController.profile);
router.get("/userprofile/:userId", verifyToken, profileController.profile);
router.post("/user/:userid/upload/", upload.single('image'), profileController.uploadFiles);

//app.post('/upload', upload.single('image'), (req, res)

module.exports = router;