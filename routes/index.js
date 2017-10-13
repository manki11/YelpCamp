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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function () {
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
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;