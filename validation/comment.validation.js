const Joi = require("joi")

const commentSchema = Joi.object({
    comments : Joi.array
        .items(Joi.objects({
            comment : Joi.string(),
            ratting : Joi.string()
        }))
})

module.exports = {
    commentSchema
}