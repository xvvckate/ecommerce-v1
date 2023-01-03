
const Joi = require("joi")
const errors = require("http-errors")
const Order = require("../models/order.model")
const { ACTIONS } = require("../config/actionList")
const { orderSchema } = require("../validation/order.validation")

const getOrder = async (req, res, next)=>{
    const { id } = req.params
    
    if(!id) return errors.BadRequest()
    try{
        const data = await Order.findById(id).populate({
            path : "item", select : "-_id color size", populate : { 
                path : "item", select : "-_id item", populate : { 
                    path : "brand", select : "-_id brand" 
                }
            }
        }).select("-user").exec()
        res.status(200).json(data)

    }catch(err){
        next(err)
    }
}

const getOrders = async (req, res, next)=>{
    try{
        const data = await Order.find({ $and : [{ 
            user : req.data._id, 
            order_status : ACTIONS.IN_PROGRESS }
        ]}).populate({
            path : "item", select : "-_id color size", populate : { 
                path : "item", select : "-_id item", populate : { 
                    path : "brand", select : "-_id brand"
                }
            }
        }).select("-user").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const placeOrder = async (req, res, next)=>{
    const { quantity } = req.body
    const { iid } = req.query

    if(!iid) return errors.BadRequest()
    try{
        const schema = await orderSchema.validateAsync({ user : req.data._id, item : iid, quantity })
        const data = await Order.create(schema)
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
}

const updateOrder = async (req, res, next)=>{
    const { quantity } = req.body
    const { oid } = req.query

    if(!oid) return errors.BadRequest()
    const validateQuantity = Joi.object({
        quantity : Joi.number().min(1).required()
    })

    try{
        const _ = await validateQuantity.validateAsync({ quantity })
        const doc = await Order.findOne({ 
            $and : [{
                _id : oid,
                user : req.data._id, 
            }]}) 
<<<<<<< HEAD
        if(doc.order_status == ACTIONS.ON_ITS_WAY){
            return res.json({
                message : "Order on it's way"
            })
        }
=======
>>>>>>> 9b7241b (order completed)
        doc.quantity = quantity
        await doc.save()
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
}

const removeOrder = async (req, res, next)=>{
    const { oid } = req.query
    
    if(!oid) return errors.BadRequest()
    try{
        const data = await Order.findByIdAndRemove(oid)
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
}

module.exports = {
    getOrder,
    getOrders,
    placeOrder,
    updateOrder,
    removeOrder
}
