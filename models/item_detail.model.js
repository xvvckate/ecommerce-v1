const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ItemDetailSchema = new Schema({
    item : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "item",
        required : true
    },
    color : { type : String },
    size : { type : String },
    price : {
        fixPrice : { type : Number, required : true },
        discountPercent : { type : Number, default : 0 },
    },
})

const ItemDetail = mongoose.model("item_detail", ItemDetailSchema)
module.exports = ItemDetail
