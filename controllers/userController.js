
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
        const _ = await bodyValidator.validateAsync({ phone_number })
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
    const validateBody = Joi.string().length(9).regex(/^[0-9]/).required()
    try{
        const _ = await validateBody.validateAsync({ recovery_phone_number })
        const doc = await User.findOne({ recovery_phone_number }).exec()
        if(doc){
            res.status(409)
            return res.json({
                error: {
                    message : "Phone Number is Used!"
                }
            })
        }

        doc.recovery_phone_number = recovery_phone_number;
        await doc.save()

        return res.sendStatus(201)

    }catch(err){
        next(err)
    }
}

module.exports = { 
    registerUser,
    getAllUsers,
    addRecoveryPhoneNumber,
}