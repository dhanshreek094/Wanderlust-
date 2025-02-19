const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const {saveRedirectUrl} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user");

// Signup Route
router.get("/signup", (req, res) => res.render("users/signup"));

router.post("/signup",
    wrapAsync(userController.signup));

// Login Route
router.get("/login", wrapAsync(userController.loginForm));


router.post("/login",saveRedirectUrl, passport.authenticate("local",
 { failureRedirect: "/login", failureFlash: true }),
wrapAsync(userController.login));

//Logout Route
router.get("/logout" ,
    wrapAsync(userController.logout));

module.exports = router;
