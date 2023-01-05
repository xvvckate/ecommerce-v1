const Joi = require("joi")

const deliverySchema = Joi.object({
    transaction_reference: Joi.string().required(),
    delivery_address : Joi.string(),
    delivered_by : Joi.string(),
    delivery_status : Joi.string(),
    delivered_date : Joi.date()
})

module.exports = { 
    deliverySchema
}