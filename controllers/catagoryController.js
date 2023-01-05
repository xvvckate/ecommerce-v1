
const { catagorySchema } = require("../validation/catagory.validation")
const Catagory = require("../models/catagory.model")
const errors = require("http-errors")

const getCatagory = async (req, res, next)=>{
    const { id } = req.params
    if(!id){
        return res.status(400).json({
            message : "Parameter Required!"
        })
    }
    try{
        const data = await Catagory.findById(id).exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getCatagorys = async (req, res, next)=>{
    try{
        const data = await Catagory.find()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createCatagory = async (req, res, next)=>{
    const { catagory, catagory_description } = req.body
    try{
        const schema = await catagorySchema.validateAsync({catagory, catagory_description })
        const data = await Catagory.create(schema)
        res.status(201).json(data)

    }catch(err){
        next(err)
    }
}

const updateCatagory = async (req, res, next)=>{
    const { cid } = req.query
    const { catagory, catagory_description } = req.body
    if(!cid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }
    try{
        const schema = await catagorySchema.validateAsync({ catagory, catagory_description })
        const data = await Catagory.findByIdAndUpdate(cid, schema)
        res.status(200).json({
            success : true,
            data
        })

    }catch(err){
        next(err)
    }
}

const removeCatagory = async (req, res, nest)=>{
    const { cid } = req.query
    if(!cid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }

    try{
        const data = await Catagory.findByIdAndRemove(cid)
        res.status(200).json({
            success : true,
            data
        })
    }catch(err){
        next(err)
    }

}

module.exports = {
    getCatagory,
    getCatagorys,
    createCatagory,
    updateCatagory,
    removeCatagory
}