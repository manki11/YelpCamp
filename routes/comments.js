"use strict";
var express= require("express"),
    Campground= require("../models/campgrounds"),
    Comment= require("../models/comments");
var router= express.Router({mergeParams:true});


//caomments new
router.get("/new",isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

//comments create
router.post("/",isLoggedIn ,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }else{
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;

                    comment.save();

                    campground.comments.push(comment);
                    campground.save(function (err, campground) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(comment);
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    });
                }
            });

        }
    });
});

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;