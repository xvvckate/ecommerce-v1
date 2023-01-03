const mongoose = require("mongoose")
const { ACTIONS } = require("../config/actionList")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    item : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "item_detail",
        required : true
    },
    quantity : { type : Number, required : true },
    status : {
        type : String,
        default : ACTIONS.IN_PROGRESS,
        enum: [ACTIONS.IN_PROGRESS, ACTIONS.DELIVERED, ACTIONS.OUT_OF_STOCK, ACTIONS.CANCLED]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Order = mongoose.model("order", OrderSchema)
module.exports = Order