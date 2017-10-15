"use strict";
var Campground=require("../models/campgrounds"),
    Comment= require("../models/comments");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership= function (req,res,next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, camp) {
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
};

middlewareObj.isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middlewareObj.checkCommentOwnership= function (req,res,next) {
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
};



module.exports= middlewareObj;