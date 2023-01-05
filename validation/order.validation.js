const Joi = require("joi")

const orderSchema = Joi.object({
    user : Joi.string().required(),
    item : Joi.string().required(),
    quantity : Joi.number().required()
})

module.exports = { orderSchema }
