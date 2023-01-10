const Joi = require("joi")

const authenticateSchema = Joi.object({
    phone_number : Joi.string()
        .min(6)
        .max(30)
        .regex(/[a-zA-Z0-9]{3,30}/)
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