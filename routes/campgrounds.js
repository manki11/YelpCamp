"use strict";
var express= require("express"),
    Campground= require("../models/campgrounds"),
    Comment= require("../models/comments");
var router= express.Router();

//INDEX
router.get("/", function (req, res) {

    Campground.find(function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

});

//CREATE
router.post("/", isLoggedIn, function (req, res) {
    var name= req.body.name;
    var img= req.body.img;
    var desc= req.body.desc;

    var author={
        id:req.user._id,
        username:req.user.username
    };

    var newCampground={
        name:name,
        img:img,
        desc:desc,
        author:author
    };
    
    console.log(newCampground);
    
    
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
router.get("/new",isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW
router.get("/:id",function (req, res) {
    var id= req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, camp) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{camp:camp});
        }
    });

});

//EDIT
router.get("/:id/edit", checkCampgroundOwnership ,function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        res.render("campgrounds/edit",{camp:camp});
    });

});

//UPDATE
router.put("/:id",checkCampgroundOwnership ,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.post,function (err, updatedBlog) {
        res.redirect("/campgrounds/"+req.params.id);
    });
});

//DELETE
router.delete("/:id", checkCampgroundOwnership ,function (req, res) {
    Campground.findById(req.params.id,function (err, camp) {
        Comment.remove({
            _id: {
                $in: camp.comments
            }
        }, function(err) {
            if(err) {
                // req.flash('error', err.message);
                res.redirect('/');
            } else {
                camp.remove(function(err) {
                    if(err) {
                        // req.flash('error', err.message);
                        return res.redirect('/');
                    }
                    // req.flash('error', 'Campground deleted!');
                    res.redirect('/campgrounds');
                });
            }
        });
    });
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next) {
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
}



module.exports= router;