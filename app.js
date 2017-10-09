"use strict";
var express= require('express');
var app= express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgrounds=[
    {name:"Salmon Reek",img:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
    {name:"Amazing Trek",img:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name:"Cool Mountains",img:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
]

app.get('/', function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {


    res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds", function (req, res) {
    campgrounds.push(req.body);
    console.log(campgrounds);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})


app.listen(5000, function () {
    console.log("YelpCamp is Online");
});