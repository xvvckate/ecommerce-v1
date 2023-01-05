const Delivery = require("../models/delivery.model")
const errors = require("http-errors")
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
        
        const _address = profile.address.find(address=> address._id !== delivery_address)
        const address = {
            country : _address.country,
            street : _address.street,
            city : _address.city,
        }
        
        const data = { 
            delivery_reference : doc._id,
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
        const data = await Delivery.find()
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

const removeDelivery = async (req, res, next)=>{
    try{

    }catch(err){

    }
}

module.exports = {
    getDelivery,
    getDeliverys,
    createDelivery
}