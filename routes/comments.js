"use strict";
var express= require("express"),
    Campground= require("../models/campgrounds"),
    User= require("../models/user"),
    Comment= require("../models/comments"),
    middleware= require("../middlewares");
var router= express.Router({mergeParams:true});


//caomments new
router.get("/new",middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
    });
});

//comments create
router.post("/",middleware.isLoggedIn ,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            req.flash("error","Something went wrong. Please try again later");
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
                            req.flash("success","Successfully added Comment");
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    });
                }
            });

        }
    });
});

//comment edit
router.put("/:comm_id", middleware.checkCommentOwnership,function (req, res) {
    Comment.findByIdAndUpdate(req.params.comm_id, req.body.comment, function (err, updatedComment) {
        if(err){
            return res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});

//comment delete
router.delete("/:comm_id", middleware.checkCommentOwnership,function (req, res) {
    Comment.findByIdAndRemove(req.params.comm_id, function (err) {
        if(err){
            res.redirect("back");
        }else{
            req.flash("error","Comment Deleted");
            res.redirect("back");
        }
    });
});

//comment like
router.post("/:comm_id/like",middleware.isLoggedIn, function (req, res) {
    Comment.findById(req.params.comm_id, function (err, comment) {
        console.log(comment);
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            User.findById(req.user._id, function (err, user) {
                console.log("found user"+user);
                comment.likes.push(user);

                comment.save(function (err, comment) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(comment);
                        // res.redirect("back");
                        res.send({success:'1', likes: comment.likes.length});
                    }
                });
            });
        }
    });
});

//comment Unlike
router.post("/:comm_id/unlike",middleware.isLoggedIn, function (req, res) {
    Comment.update(
        { "_id": req.params.comm_id},
        { "$pull": { "likes": req.user._id} },
        function (err, result){
            if (err) throw err;
            console.log(result);
            Comment.findById(req.params.comm_id, function (err, comment) {
                console.log(comment);
                if(err){
                    console.log(err);
                    res.redirect("back");
                }else{
                    res.send({success:'1',likes: comment.likes.length});
                }
            });
        }
    );
});



module.exports= router;