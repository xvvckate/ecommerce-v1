const Joi = require("joi")

const itemSchema = Joi.object({
    item : Joi.string().required(),
    brand: Joi.string().required(),
    catagory : Joi.string().required(),
    substring : Joi.string(),
    image : Joi.string(),
    made_in : Joi.string(),
    description : Joi.string(),
    usage : Joi.array().items(Joi.string())
})

module.exports = { itemSchema }
