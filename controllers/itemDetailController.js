
const { itemDetailSchema } = require("../validation/item_detail.validation")
const ItemDetail = require("../models/item_detail.model")
const errors = require("http-errors")

const getItemDetail = async (req, res, next)=>{
    const { id } = req.params
    if(!id){
        return res.status(400).json({
            message : "Parameter Required!"
        })
    }
    
    try{
        const data = await ItemDetail.findById(id).populate("item", "-_id item").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getItemDetails = async (req, res, next)=>{
    try{
        const data = await ItemDetail.find().populate("item", "-_id item")
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
    if(!iid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }
    try{
        const schema = await itemDetailSchema.validateAsync({
            item : iid, 
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
    if(!iid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }

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