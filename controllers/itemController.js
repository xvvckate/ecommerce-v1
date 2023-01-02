
const { itemSchema } = require("../validation/item.validation")
const Item = require("../models/item.model")
const errors = require("http-errors")

const getItem = async (req, res, next)=>{
    const { id } = req.params
    if(!id){
        return res.status(400).json({
            message : "Parameter Required!"
        })
    }
    try{
        const data = await Item.findById(id).populate("catagory", "-_id catagory").populate("brand", "-_id brand").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getItems = async (req, res, next)=>{
    try{
        const data = await Item.find().populate("catagory", "-_id catagory").populate("brand", "-_id brand").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createItem = async (req, res, next)=>{
    const { item, brand, catagory, substring, image, made_in, description, usage } = req.body
    try{
        const schema = await itemSchema.validateAsync({ item, brand, catagory, substring, image, made_in, description, usage })
        const data = await Item.create(schema)
        res.status(201).json(data)

    }catch(err){
        next(err)
    }
}

const updateItem = async (req, res, next)=>{
    const { iid } = req.query
    const { item, brand, catagory, substring, image, made_in, description, usage } = req.body
    if(!iid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }
    try{
        const schema = await itemSchema.validateAsync({ item, brand, catagory, substring, image, made_in, description, usage })
        const data = await Item.findByIdAndUpdate(iid, schema)
        res.status(200).json({
            success : true,
            data
        })

    }catch(err){
        next(err)
    }
}

const removeItem = async (req, res, nest)=>{
    const { iid } = req.query
    if(!iid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }

    try{
        const data = await Item.findByIdAndRemove(iid)
        res.status(200).json({
            success : true,
            data
        })
    }catch(err){
        next(err)
    }

}

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    removeItem
}