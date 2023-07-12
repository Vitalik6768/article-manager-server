const express = require("express");
const adminController = require('../controllers/adminControllers');
const { upload, verifyToken } = require("../midleware/midlewareFunc");

const router = express.Router();


//Get all users
router.get("/:userId", verifyToken, adminController.getAllUsers);

router.post("/:userId/register", verifyToken, adminController.addNewUser);

// Update a user role
router.put("/:userId/update/:id", verifyToken, adminController.updateRole);

//Update a user status
router.put("/:userId/status/:id", verifyToken, adminController.updateStatus);


// // Add a new user
// router.post("/add", adminController.addUser);

// Delete a user
router.delete("/:userId/delete/:id", adminController.deleteUser);


module.exports = router;