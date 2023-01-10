
const { itemDetailSchema } = require("../validation/item_detail.validation")
const ItemDetail = require("../models/item_detail.model")
const errors = require("http-errors")

const getItemDetail = async (req, res, next)=>{
    const { id } = req.params
    if(!id) return errors.BadRequest()
    
    try{
        const doc = await ItemDetail.findById(id).populate({path : "item", populate : { path : "brand"}}).exec()
        const { _id, color, size, price } = doc
        const { item, brand } = doc?.item
        const data = {
            item_detail_reference : _id,
            item_reference : doc.item._id,
            brand : brand?.brand,
            item,
            color,
            size,
            fixPrice : price?.fixPrice,
            discountPercent : `${price?.discountPercent}%`,
        }

        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getItemDetails = async (req, res, next)=>{
    try{
        const docs = await ItemDetail.find().populate({path : "item", populate : { path : "brand"}}).exec()
        const data = docs.map(doc=>{
            const { _id, color, size, price } = doc
            const { item, brand } = doc?.item
            return {
                item_detail_reference : _id,
                item_reference : doc?.item._id,
                brand : brand?.brand,
                item : item,
                color,
                size,
                fixPrice : price?.fixPrice,
                discountPercent : `${price?.discountPercent}%`,
            }
        })
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createItemDetail = async (req, res, next)=>{
    const { item, color, size, fixPrice, discountPercent } = req.body

    try{
        const schema = await itemDetailSchema.validateAsync({ 
            item, 
            color, 
            size, 
            price : { 
                fixPrice, 
                discountPercent
            } 
        })
        const data = await ItemDetail.create(schema)
        res.status(201).json(schema)

    }catch(err){
        next(err)
    }
}

const updateItemDetail = async (req, res, next)=>{
    const { iid } = req.query
    const { color, size, fixPrice, discountPercent } = req.body
    if(!iid) return errors.BadRequest()

    try{
        const schema = await itemDetailSchema.validateAsync({
            color, 
            size, 
            price : { 
                fixPrice, 
                discountPercent
            } 
        })
        
        const data = await ItemDetail.findByIdAndUpdate(iid, schema)
        res.status(200).json({
            success : true,
            data
        })

    }catch(err){
        next(err)
    }
}

const removeItemDetail = async (req, res, nest)=>{
    const { iid } = req.query
    if(!iid) return errors.BadRequest()

    try{
        const data = await ItemDetail.findByIdAndRemove(iid)
        res.status(200).json({
            success : true,
            data
        })
    }catch(err){
        next(err)
    }

}

module.exports = {
    getItemDetail,
    getItemDetails,
    createItemDetail,
    updateItemDetail,
    removeItemDetail
}

