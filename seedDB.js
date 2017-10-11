"use strict";
var mongoose= require("mongoose");
var Campground= require("./models/campgrounds");
var Comment= require("./models/comments");

var data=[
    {name:"Sandy Sun", img:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg", desc:"The best place for dessert lovers!!"},
    {name:"Rainy Forest", img:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg", desc:"The best place for Rain lovers!!"},
    {name:"Sunset Hill", img:"https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg", desc:"The best place for sunset lovers!!"}
]




function seedDB() {
    //Remove Campgrounds
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        }else{
          console.log("Removed campgrounds");
            //Add Campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err,campground) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground:"+ campground.name);
                        // create comment
                        Comment.create({
                            text:campground.name+"is a nice place and beutiful views",
                            author:"Homer"
                        }, function (err, comment) {
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                                
                            }
                        });
                    }
                });
            });
        }
    });


}

module.exports= seedDB;