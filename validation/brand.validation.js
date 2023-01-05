const Joi = require("joi")

const brandSchema = Joi.object({
    brand : Joi.string().required(),
    brand_description : Joi.string(),
    brand_img : Joi.string(),
})

module.exports = {
    brandSchema    
}