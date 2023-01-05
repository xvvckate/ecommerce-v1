const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    order_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    order_reference : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "order",
        required : true
    }],
    item_total_price : { type: Number, required : true },
    bicker_price : { type : Number, required : true },
    total_price : { type : Number, required : true},
    recived_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    is_complete : { type : Boolean, default : false }
},{
    timestamps : true
})

const Transaction = mongoose.model("transaction", TransactionSchema)
module.exports = Transaction
