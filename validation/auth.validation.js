const Joi = require("joi")

const authenticateSchema = Joi.object({
    phone_number : Joi.string()
        .length(9)
        .regex(/^[0-9]/)
        .required()
})


module.exports = { 
    authenticateSchema 
}