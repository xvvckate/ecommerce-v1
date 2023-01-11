const Joi = require("joi")
const errors = require("http-errors")
const Delivery = require("../models/delivery.model")
const { deliverySchema } = require("../validation/delivery.validation")


const getDelivery = async (req, res, next)=>{
    const { id } = req.params
    if(!id) return errors.BadRequest()

    try{
        const doc = await Delivery.findById(id).populate({
            path : "transaction_reference", populate : { 
                path : "order_by", select:"-_id profile total_price is_complete" 
            }
        }).exec()
        
        const { transaction_reference, delivery_address, delivery_status } = doc
        const { order_by, item_total_price, bicker_price, total_price, is_complete } = transaction_reference
        const { profile } = order_by
        const { firstname, middlename, lastname } = profile?.fullname
        let counter = 0;
        const _address = await profile?.address.find(address=>String(address._id) == String(delivery_address))

        const address = {
            alias : _address?.alias,
            country : _address?.country,
            city : _address?.city,
            street : _address?.street,
        }

        const data = { 
            delivery_reference : doc._id,
            transaction_reference : transaction_reference._id,
            order_by : `${firstname} ${middlename} ${lastname}`,
            delivery_address : address,
            item_total_price,
            bicker_price,
            total_price,
            is_complete,
            delivery_status           
        }

        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getDeliverys = async (req, res, next)=>{
    try{
        const docs = await Delivery.find().populate({
            path : "transaction_reference", populate : { 
                path : "order_by", select:"-_id profile total_price is_complete" 
            }
        }).exec()
        const data = await docs.map(doc=>{
            const { transaction_reference, delivery_address, delivery_status } = doc
            const { order_by, item_total_price, bicker_price, total_price, is_complete } = transaction_reference
            const { profile } = order_by
            const { firstname, middlename, lastname } = profile?.fullname
            
            const _address = profile?.address.find(address=> String(address._id) == String(delivery_address))
            const address = {
                alias : _address?.alias,
                country : _address?.country,
                city : _address?.city,
                street : _address?.street,
            }

            
            return { 
                delivery_reference : doc._id,
                transaction_reference : transaction_reference._id,
                order_by : `${firstname} ${middlename} ${lastname}`,
                delivery_address : address,
                item_total_price,
                bicker_price,
                total_price,
                is_complete,
                delivery_status,
                         
            }
        })

        res.status(200).json(data)       
    }catch(err){
        next(err)
    }
}

const createDelivery = async (req, res, next)=>{
    const { tid } = req.query
    const { delivery_address } = req.body
    if(!tid) return errors.BadRequest()

    try{
        
        const schema = await deliverySchema.validateAsync({ transaction_reference : tid,  delivery_address })
        const data = await Delivery.create(schema)
        res.status(201).json({
            status : true,
            data
        })
    }catch(err){
        next(err)
    }
}


const changeDeliveryAddress = async (req, res, next)=>{
    const { did } = req.query
    const { address } = req.body
    if(!did) return errors.BadRequest();

    const addressSchema = Joi.object({
        address : Joi.string().required()
    })

    try{
        const _ = addressSchema.validateAsync({ address })
        const doc = await Delivery.findOne({_id : did })
        if(!doc){
            return errors.NotFound()
        }
        doc.delivery_address = address
        const data = await doc.save()
        res.status(200).json({
            status : true,
            data
        })
            
    }catch(err){
        next(err)
    }
}

module.exports = {
    getDelivery,
    getDeliverys,
    createDelivery,
    changeDeliveryAddress
}