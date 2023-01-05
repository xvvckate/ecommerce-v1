const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    brand : {
        type : String,
        required : true
    },
    brand_description : { type : String, trim : true },
    band_img:  { type : String, trim : true }
},{
    timestamps : true
})

const Brand = mongoose.model("brand", BrandSchema)
module.exports = Brand