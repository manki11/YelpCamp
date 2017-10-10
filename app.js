"use strict";
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgroundsSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc:String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

// // Create demo data
// Campground.create({
//     name: "Cool Mountains",
//     img: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//     desc:"Camp in the Alaskan Mountains, Away from the summer heat. Washrooms and food to be provdided. Happy Camping!!"
// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Campground Created");
//     }
// })


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

})

//CREATE
app.post("/campgrounds", function (req, res) {
    var name= req.body.name;
    var img= req.body.img;
    var desc= req.body.desc;

    var newCampground={
        name:name,
        img:img,
        desc:desc
    }
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Created");
        }
    })
    res.redirect("/campgrounds");
})

//NEW
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})

//SHOW
app.get("/campgrounds/:id", function (req, res) {
    var id= req.params.id;
    Campground.findById(id,function (err, camp) {
        if(err){
            console.log(err);
        }else{
            res.render("show",{camp:camp});
        }
    });

})


app.listen(5000, function () {
    console.log("YelpCamp is Online");
});