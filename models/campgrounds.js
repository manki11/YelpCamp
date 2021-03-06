var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema({
    name: String,
    img:  String,
    price: String,
    desc: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

campgroundsSchema.index({name:'text', 'author.username':'text'});

module.exports = mongoose.model("Campground", campgroundsSchema);

