const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CatagorySchema = new Schema({
    catagory : {
        type : String,
        required : true,
        trim : true
    },
    catagory_description : { type : String, trim : true },
    catagory_img : { type : String, trim : true }
})

const Catagory = mongoose.model("catagory", CatagorySchema)
module.exports = Catagory
