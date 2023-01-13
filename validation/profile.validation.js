const Joi = require("joi")

const profileSchema = Joi.object({
    profile : Joi.object({
        fullname : Joi.object({
            firstname : Joi.string().required(),
            middlename : Joi.string().required(),
            lastname : Joi.string().required()
        }),
        address : Joi.array().items(
            Joi.object({
                alias : Joi.string(),
                country : Joi.string(),
                city : Joi.string(),
                street : Joi.string()
            })
        ),
        gender : Joi.string()
    }),
    recovery_phone_number : Joi.string()
        .length(9)
        .regex(/^[0-9]/),
})

const addressSchema = Joi.object({
    address : Joi.array().items(
        Joi.object({
            alias : Joi.string().required(),
            country : Joi.string().required(),
            city : Joi.string().required(),
            street : Joi.string().required()
        })
    )
})

module.exports = { 
    profileSchema,
    addressSchema
}
