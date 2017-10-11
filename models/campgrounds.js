var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema({
    name: String,
    img:  String,
    desc: String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundsSchema);

