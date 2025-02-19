const User = require("../models/user");

module.exports.signup = async (req, res) => {
    try {
        const newUser = new User({ email: req.body.email, username: req.body.username });
        console.log(newUser);
        await User.register(newUser, req.body.password);
        req.flash("success", "Welcome to Wanderlust!");
        return res.redirect("/listings"); 
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup"); 
    }
};


module.exports.loginForm = (req, res) => res.render("users/login");

module.exports.login =  (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out");
        return res.redirect("/listings"); 
    });
};

