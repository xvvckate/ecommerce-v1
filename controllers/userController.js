
const errors = require("http-errors")

const User = require("../models/user.model")
const { userSchema } = require("../validation/user.validation")


const getAllUsers = async (req, res, next)=>{
    try{
        const data = await User.find().exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const registerUser = async (req, res, next)=>{
    const { username, phone_number } = req.body
    try{
        const _ = await userSchema.validateAsync({ username, phone_number})
        const checkUsername = await User.findOne({ 
            $or : [
                {username}, 
                {phone_number}
            ]
        })

        if(checkUsername) throw errors.Conflict()
        const data = await User.create({
            username,
            phone_number,
        })
        
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
}

module.exports = { 
    registerUser,
    getAllUsers,
}