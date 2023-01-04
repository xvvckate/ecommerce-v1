const mongoose = require("mongoose")
const { ACTIONS } = require("../config/actionList")
const Schema = mongoose.Schema

const DeliverySchema = new Schema({
    transaction_reference : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "transaction",
        required : true
    },
    delivery_address : { 
        type : mongoose.Schema.Types.ObjectId, 
        // ref : "user.profile",
        required : true 
    },
    delivered_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    delivery_status : { 
        type : String, 
        default : ACTIONS.PENDING,
        enum : [ ACTIONS.PENDING, ACTIONS.IN_ITS_WAY, ACTIONS.DELIVERED ]
    },
    delivered_date : { type : Date }
})

const Delivery = mongoose.model("delivery", DeliverySchema)
module.exports = Delivery 
