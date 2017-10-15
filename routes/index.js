"use strict";
var express= require("express"),
    passport= require("passport"),
    User= require("../models/user");
var router= express.Router();


router.get('/', function (req, res) {
    res.render("landing");
});


//REGISTER
router.get("/register", function (req, res) {
    res.render("auth/register");
});

router.post("/register",function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password,function (err, User) {
        if(err){
            req.flash("error",err.message);
            console.log(err);
            return res.redirect("back");
        }
        passport.authenticate("local")(req,res, function () {
            req.flash("success","Welcome to YelpCamp"+ User.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN
router.get("/login", function (req, res) {
    res.render("auth/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}) ,function (req, res) {

});

//LOGOUT
router.get("/logout", function (req, res) {
    req.flash("success","You have been logged out!");
    req.logOut();
    res.redirect("/campgrounds");
});


module.exports= router;