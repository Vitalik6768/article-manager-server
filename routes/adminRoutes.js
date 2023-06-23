const express = require("express");
const adminController = require('../controllers/adminControllers');
const { upload, verifyToken } = require("../midleware/midlewareFunc");

const router = express.Router();


//Get all users
router.get("/:userid", verifyToken, adminController.getAllUsers);

router.post("/:admin/register", verifyToken, adminController.addNewUser);

// Update a user role
router.put("/:admin/update/:userid", verifyToken, adminController.updateRole);

//Update a user status
router.put("/:admin/status/:userid", verifyToken, adminController.updateStatus);


// // Add a new user
// router.post("/add", adminController.addUser);

// Delete a user
router.delete("/:admin/delete/:userid", adminController.deleteUser);


module.exports = router;