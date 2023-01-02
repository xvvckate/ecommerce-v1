const Joi = require("joi")

const productSchema = Joi.object({
    products : Joi.array()
        .items(Joi.object({
            color : Joi.string(),
            size : Joi.string(),
            catagory : Joi.string(),
            price : Joi.object({
                fixPrice : Joi.number().required(),
                discountPercent : Joi.number(),
            })
        })),     
})

module.exports = {
    productSchema,
}
