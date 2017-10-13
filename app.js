"use strict";
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport= require('passport'),
    LocalStrategy= require('passport-local'),
    User= require('./models/user'),
    Campground= require("./models/campgrounds"),
    Comment= require("./models/comments"),
    seedDB= require("./seedDB");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"This is the secret line",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser= req.user;
    next();
});


app.get('/', function (req, res) {
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function (req, res) {

    Campground.find(function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

});

//CREATE
app.post("/campgrounds", function (req, res) {
    var name= req.body.name;
    var img= req.body.img;
    var desc= req.body.desc;

    var newCampground={
        name:name,
        img:img,
        desc:desc
    };
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Created");
        }
    });
    res.redirect("/campgrounds");
});

//NEW
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//SHOW
app.get("/campgrounds/:id",function (req, res) {
    var id= req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, camp) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{camp:camp});
        }
    });

});


// ==============
// COMMENT ROUTES
// ==============

app.get("/campgrounds/:id/comments/new",isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

app.post("/campgrounds/:id/comments",isLoggedIn ,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save(function (err, campground) {
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    });
                }
            });

        }
    });
});

// ==============
// AUTH ROUTES
// ==============

//REGISTER
app.get("/register", function (req, res) {
    res.render("auth/register");
});

app.post("/register",function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("auth/login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}) ,function (req, res) {

});

//LOGOUT
app.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(5000, function () {
    console.log("YelpCamp is Online");
});