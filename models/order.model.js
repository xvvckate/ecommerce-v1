const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
        required : true
    },
    product_detail : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    quantity : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : ""
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Order = mongoose.model('order', OrderSchema)
module.exports = Order