const bcrypt = require("bcrypt")
const errors = require("http-errors")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")
const { authenticateSchema } = require("../validation/auth.validation")

const authenticateUser = async (req, res, next)=>{
    const { username, password } = req.body 
    
    try{
        const _ = await authenticateSchema.validateAsync({ username, password })
        const user = await User.findOne({username}).exec()
        if(!user) throw errors.Unauthorized()

        const match = await bcrypt.compare(password, user.password)
        if(!match)  throw errors.Unauthorized()
        const roles = Object.values(user.roles)
        const accesssToke = jwt.sign({
            _id : user._id,
            username : user.username,
            roles : roles
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : "1d"
        })

        const refreshToke = jwt.sign({
            _id : user._id,
            username : user.username,
            roles : roles
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : "1d"
        })

        res.status(200).json({accesssToke})
    }catch(err){
        next(err)
    }
}

module.exports = { 
    authenticateUser 
}