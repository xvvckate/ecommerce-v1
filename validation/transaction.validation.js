const Joi = require("joi")

const transactionSchema = Joi.object({
    order_by : Joi.string().required(),
    order_reference : Joi.array().items(
        Joi.string().required()
    ),
    item_total_price : Joi.number().required(),
    bicker_price : Joi.number().required(),
    total_price : Joi.number().required(),
    recived_by : Joi.string(),
    is_cmplete : Joi.boolean()
})


module.exports = { 
    transactionSchema 
}