var mongoose= require("mongoose");

var CommentShema= new mongoose.Schema({
    text:String,
    author:String
});

module.exports= mongoose.model("Comment", CommentShema);