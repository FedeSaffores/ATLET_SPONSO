const { Router } = require("express");
//const { User } = require("../db");
//const passport = require("passport");
const authController = require("../controllers/autentController.js");
//const jwt = require("jsonwebtoken");

const router = Router();
router.post("/login", authController.login);
router.post("/user", authController.register);
router.get("/confirm/:confirmationCode", authController.verifyUser);

module.exports = router;
