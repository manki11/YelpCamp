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

router.put("/:comm_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comm_id, req.body.comment, function (err, updatedComment) {
        if(err){
            return res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});

router.delete("/:comm_id", function (req, res) {

})

function checkCommentOwnership(req,res,next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.id, function (err, camp) {
            if(err){
                console.log(err);
                return res.redirect("back");
            }else{
                if(camp.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;