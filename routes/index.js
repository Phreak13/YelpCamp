let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");

//index route
router.get("/", function (req, res) {
    res.render("landing");
});


// show register form
router.get("/register", function (req, res) {
    res.render("register");
});


//handle sign up logic
router.post("/register", function (req, res) {
    let newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

//logout route

router.get("/logout", function (req, res) {
    req.flash("error", "Logged Out");
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;