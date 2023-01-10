const Joi = require("joi")

const authenticateSchema = Joi.object({
    username : Joi.string()
        .lowercase()
        .min(5)
        .max(20)
        .required(),
    phone_number : Joi.string()
        .min(6)
        .max(30)
        .regex(/[0-9]{3,30}/)
        .required()
})


module.exports = { 
    authenticateSchema 
}