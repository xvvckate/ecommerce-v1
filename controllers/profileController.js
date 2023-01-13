const Joi = require("joi")
const errors = require("http-errors")

const User = require("../models/user.model")
const { profileSchema, addressSchema } = require("../validation/profile.validation")

const createProfile = async (req, res, next)=>{
    const { firstname, middlename, lastname, alias, country, city, street, gender } = req.body
   
    try{
        const _ = await profileSchema.validateAsync({
            profile : {
                fullname : {
                    firstname,
                    middlename,
                    lastname
                },
                address :[{
                    alias, 
                    country, 
                    city, 
                    street  
                }],
                gender
            }
        })

        const doc = await User.findByIdAndUpdate(
            req.data._id 
            ,{
                "profile.fullname" : {
                    firstname,
                    lastname,
                    middlename,
                },
                "profile.gender" : gender,
                $push : {
                    "profile.address" : { 
                        alias, 
                        country, 
                        city, 
                        street 
                    }
                }      
                 
            }
        ).exec()

        res.sendStatus()
    }catch(err){
        next(err)
    }
}


const addMoreAddress = async (req, res, next)=>{
    const { alias, country, city, street  } = req.body

    try{
        const _ = await addressSchema.validateAsync({
            address :[{
                alias, 
                country, 
                city, 
                street  
            }]
        })

        const doc = await User.findByIdAndUpdate(req.data._id,
            {
                $push : {
                    "profile.address" : {
                        alias,
                        country,
                        city,
                        street
                    }
                }
            }).exec()

        res.sendStatus(201)
    }catch(err){
        next(err)
    }
}

const updateAddress = async (req, res, next)=>{
    const { aid } = req.query
    const { alias, country, city, street } = req.body

    if(!aid) errors.BadRequest()

    try{
        const _ = await addressSchema.validateAsync({
            address :[{
                alias, 
                country, 
                city, 
                street  
            }]
        })
        
        const doc = await User.findOne({ _id : req.data._id })
        const { address } = doc.profile
        address.id(aid).alias = alias
        address.id(aid).country = country
        address.id(aid).city = city
        address.id(aid).street = street
        
        await doc.save()
        res.sendStatus(202)

    }catch(err){
        next(err)
    }
}

const removeAddress = async (req, res, next)=>{
    const { aid } = req.query
    if(!aid) return errors.BadRequest()

    const schema = Joi.object({ 
        aid : Joi.string().required() 
    }) 

    try{
        const data = await schema.validateAsync({ aid })
        const doc = await User.findOne({ _id : req.data._id })
        console.log("doc: ")
        console.log(doc)
        const { address } = doc.profile
        await address.id(data?.aid).remove()
        await doc.save()
        res.sendStatus(202)
        
    }catch(err){
        next(err)
    }
}

module.exports = {
    createProfile,
    addMoreAddress,
    updateAddress,
    removeAddress,
}