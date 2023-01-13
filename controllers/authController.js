
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const errors = require("http-errors")

const User = require("../models/user.model")

const authenticateUser = async (req, res, next)=>{
    const { phone_number } = req.body 
    const bodyValidation = Joi.string().length(9).regex(/^[0-9]/).required()

    try{
        const _ = await bodyValidation.validateAsync(phone_number)
        const user = await User.findOne({ phone_number }).exec()
        if(!user) throw errors.Unauthorized()

        const roles = Object.values(user.roles)
        const accesssToke = jwt.sign({
            _id : user._id,
            roles : roles
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : "1d"
        })

        const refreshToke = jwt.sign({
            _id : user._id,
            roles : roles
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : "1d"
        })

        res.status(200).json({accesssToke, refreshToke})
    }catch(err){
        next(err)
    }
}

module.exports = { 
    authenticateUser 
}