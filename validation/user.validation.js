const Joi = require("joi")

const userSchema = Joi.object({
    username : Joi.string()
        .lowercase()
        .min(5)
        .max(20)
        .required(),
    phone_number : Joi.string()
        .length(9)
        .regex(/^[0-9]/)
        .required()
})

module.exports = { userSchema }