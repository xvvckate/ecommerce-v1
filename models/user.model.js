const mongoose = require("mongoose")
const { ROLES } = require("../config/roleList")

const Schema = mongoose.Schema

const UserSchema = new Schema({

    username : {
        type : String,
        unique : true,
        trim: true,
        lowercase: true,
        reqired : true,
    },
    phone_number : {
        type : String,
        unique : true,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        trim: true,
        lowercase: true
    },
    password : {
        type : String,
        required : true
    },
    roles : {
        Customer : {
            type : Number,
            default : ROLES.CUSTOMER
        },
        Employee : { type : Number },
        Bicker : { type : Number },
        Admin : { type : Number },
    },
    profile : {
        fullname : {
            firstname : { type : String },
            middlename : { type : String },
            lastname : { type : String },
        },
        gender : { 
            type: String,
            enum : [ "Male", "Female" ]
        },
        address : [
            {
                alias : { type : String },
                country: {type: String },
                city: { type: String },
                street : { type : String },
            }
        ],
    },
    wishlist : [mongoose.Schema.Types.ObjectId],
    status : {
        type : Boolean,
        default : true
    },
    registerAt : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model("user", UserSchema)
module.exports = User
