const jwt = require("jsonwebtoken")
const errors = require("http-errors")
const verifyAuth = async (req, res, next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    try{

        if(!authHeader?.startsWith("Bearer ")) throw errors.Unauthorized()
        const token = authHeader.split(" ")[1]

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decode)=>{
                if(err) throw errors.Unauthorized()
                req.data = { 
                    _id : decode._id,
                    username : decode.username,
                }
                req.roles = decode.roles
                next()
            }
        )
    }catch(err){
        next(err)
    }
}


module.exports = verifyAuth