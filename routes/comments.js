"use strict";
var express= require("express"),
    Campground= require("../models/campgrounds"),
    User= require("../models/user"),
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

//comment edit
router.put("/:comm_id", checkCommentOwnership,function (req, res) {
    Comment.findByIdAndUpdate(req.params.comm_id, req.body.comment, function (err, updatedComment) {
        if(err){
            return res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});

//comment delete
router.delete("/:comm_id", checkCommentOwnership,function (req, res) {
    Comment.findByIdAndRemove(req.params.comm_id, function (err) {
        if(err){
            res.redirect("back");
        }else{
            res.redirect("back");
        }
    });
});

//comment like
router.post("/:comm_id/like",isLoggedIn, function (req, res) {
    Comment.findById(req.params.comm_id, function (err, comment) {
        console.log(comment);
        
       if(err){
           console.log(err);
           res.redirect("back");
       } else{
           User.findById(req.user._id, function (err, user) {
               console.log("found user"+user);
               comment.likes.push(user);

               comment.save(function (err, comment) {
                   if(err){
                       console.log(err);
                   }else{
                       console.log(comment);
                       res.redirect("back");
                   }
               });
           });
       }
    });
});

function checkCommentOwnership(req,res,next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comm_id, function (err, comment) {
            if(err){
                console.log(err);
                return res.redirect("back");
            }else{
                if(comment.author.id.equals(req.user._id)){
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