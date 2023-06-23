const express = require("express");
const authControoler = require('../controllers/usersControllers');

const router = express.Router();


router.post("/register", authControoler.register);
router.post("/login", authControoler.login);


module.exports = router;