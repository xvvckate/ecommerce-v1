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
    order_status : {
        type : String,
        default : ACTIONS.IN_PROGRESS,
<<<<<<< HEAD
        enum: [ACTIONS.IN_PROGRESS, ACTIONS.DELIVERED, ACTIONS.ON_ITS_WAY, ACTIONS.OUT_OF_STOCK, ACTIONS.CANCLED]
=======
        enum: [ACTIONS.IN_PROGRESS, ACTIONS.DELIVERED, ACTIONS.OUT_OF_STOCK, ACTIONS.CANCLED]
>>>>>>> 9b7241b (order completed)
    }
},{
    timestamps : true
})

const Order = mongoose.model("order", OrderSchema)
module.exports = Order