const Joi = require("joi")

const userSchema = Joi.object({
    username : Joi.string()
        .lowercase()
        .min(5)
        .max(20)
        .required(),
    phone : Joi.number()
        .integer()
        .max(999999999)
        .required(),
    password: Joi.string()
        .min(6)
        .max(30)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required()

})

module.exports = { userSchema }