"use strict";
var mongoose= require("mongoose");

var CommentShema= new mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

// CommentShema.pre('remove', function (next) {
//     this.model('Campground').remove({ comments: this._id }, next);
// });

module.exports= mongoose.model("Comment", CommentShema);