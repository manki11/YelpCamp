"use strict";
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport= require('passport'),
    override=require('method-override'),
    LocalStrategy= require('passport-local'),
    User= require('./models/user'),
    Campground= require("./models/campgrounds"),
    Comment= require("./models/comments"),
    connectFlash= require("connect-flash"),
    seedDB= require("./seedDB");

var campgroundRoutes= require("./routes/campgrounds"),
    commentRoutes= require("./routes/comments"),
    indexRoutes= require("./routes/index");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(connectFlash());


// seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"This is the secret line",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(override("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser= req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

//requiring routes
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

app.listen(5000, function () {
    console.log("YelpCamp is Online");
});