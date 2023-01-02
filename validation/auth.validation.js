const Joi = require("joi")

const authenticateSchema = Joi.object({
    username : Joi.string()
        .lowercase()
        .min(5)
        .max(20)
        .required(),
    password : Joi.string()
        .min(6)
        .max(30)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required()
})


module.exports = { 
    authenticateSchema 
}