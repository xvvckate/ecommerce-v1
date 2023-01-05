const Joi = require("joi")

const catagorySchema = Joi.object({
    catagory : Joi.string().required(),
    catagory_description : Joi.string(),
    catagory_img : Joi.string(),
})

module.exports = {
    catagorySchema    
}