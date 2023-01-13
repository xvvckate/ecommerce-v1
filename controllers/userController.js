
const Joi = require("joi")
const errors = require("http-errors")

const User = require("../models/user.model")


const getAllUsers = async (req, res, next)=>{
    try{
        const data = await User.find().exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const registerUser = async (req, res, next)=>{
    const { phone_number } = req.body
    const bodyValidator = Joi.string().length(9).regex(/^[0-9]/).required()

    try{
        const _ = await bodyValidator.validateAsync(phone_number)
        const checkPhoneNumber = await User.findOne({ phone_number })

        if(checkPhoneNumber){
            return res.status(409).json({
                error : {
                    message : "Phone Number is Used!"
                }
            })
        }
        await User.create({ phone_number })
        
        res.sendStatus(201)
    }catch(err){
        next(err)
    }
}

const addRecoveryPhoneNumber = async (req, res, next)=>{
    const { recovery_phone_number } = req.body
    const bodyValidation = Joi.string().length(9).regex(/^[0-9]/).required()

    try{
        const schema = await bodyValidation.validateAsync(recovery_phone_number)
        const doc = await User.findOne({_id : req.data._id}).exec()
        
        if(String(doc?.phone_number) == String(schema)){
            return res.status(409).json({
                error: {
                    message : "Phone Number is Used!"
                }
            })
        }

        doc.recovery_phone_number = schema;
        await doc.save()

        return res.sendStatus(201)

    }catch(err){
        next(err)
    }
}

const removeRecoveryPhoneNumber = async (req, res, next)=>{
    try{
        const doc = await User.findById(req.data._id)
        doc.recovery_phone_number = null
        await doc.save()
        res.sendStatus(202)
    }catch(err){
        next(err)
    }
}

module.exports = { 
    registerUser,
    getAllUsers,
    addRecoveryPhoneNumber,
    removeRecoveryPhoneNumber
}