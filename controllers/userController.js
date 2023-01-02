
const bcrypt = require("bcrypt")
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
    const { username, phone, password } = req.body
    try{
        const _ = await userSchema.validateAsync({ username, phone, password})
        const checkUsername = await User.findOne({ 
            $or : [
                {username}, 
                {phone}
            ]
        })

        if(checkUsername) throw errors.Forbidden()
        const hashedPassword = await bcrypt.hash(password, 8)
        const data = await User.create({
            username,
            phone,
            password : hashedPassword
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