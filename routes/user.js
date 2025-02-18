const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const {saveRedirectUrl} = require("../middleware");

// Signup Route
router.get("/signup", (req, res) => res.render("users/signup"));

router.post("/signup", async (req, res) => {
    try {
        const newUser = new User({ email: req.body.email, username: req.body.username });
        console.log(newUser);
        await User.register(newUser, req.body.password);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

// Login Route
router.get("/login",  (req, res) => res.render("users/login"));

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

//Logout Route
router.get("/logout" , (req , res , next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
})

module.exports = router;
