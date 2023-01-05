const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    comment : {
        type : String,
        required : true,
        trim : true
    },   
    ratting : {
        type : Number,
        min : 1,
        max : 5,
    }
},
{
    timestamps : true
})

const ItemSchema = new Schema({
    item : {
        type : String,
        required : true,
        trim : true
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "brand",
        required : true
    },
    catagory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "catagory",
        required : true
    },
    subcatagory : { type : String, trim : true },
    image : { type : String, time : true },
    comments : [ CommentSchema ],
    made_in : { type : String, trim : true },
    description : { type : String, trim : true },
    usage : [ String ],
},{
    timestamps : true
})

const Item = mongoose.model('item', ItemSchema)
module.exports = Item
