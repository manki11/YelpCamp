"use strict";
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground= require("./models/campgrounds"),
    seedDB= require("./seedDB");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();


app.get('/', function (req, res) {
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function (req, res) {

    Campground.find(function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new");
});

//SHOW
app.get("/campgrounds/:id",function (req, res) {
    var id= req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, camp) {
        if(err){
            console.log(err);
        }else{
            res.render("show",{camp:camp});
        }
    });

});


app.listen(5000, function () {
    console.log("YelpCamp is Online");
});