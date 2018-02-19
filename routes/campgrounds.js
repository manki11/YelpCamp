"use strict";
var express= require("express"),
    Campground= require("../models/campgrounds"),
    Comment= require("../models/comments"),
    middleware= require("../middlewares");
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
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name= req.body.name;
    var img= req.body.img;
    var price= req.body.price;
    var desc= req.body.desc;

    var author={
        id:req.user._id,
        username:req.user.username
    };

    var newCampground={
        name:name,
        img:img,
        desc:desc,
        author:author,
        price:price
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
router.get("/new",middleware.isLoggedIn, function (req, res) {
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
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        res.render("campgrounds/edit",{camp:camp});
    });

});

//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership ,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.post,function (err, updatedBlog) {
        res.redirect("/campgrounds/"+req.params.id);
    });
});

//DELETE
router.delete("/:id", middleware.checkCampgroundOwnership ,function (req, res) {
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





module.exports= router;