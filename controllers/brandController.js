
const { brandSchema } = require("../validation/brand.validation")
const Brand = require("../models/brand.model")
const errors = require("http-errors")

const getBrand = async (req, res, next)=>{
    const { id } = req.params
    if(!id){
        return res.status(400).json({
            message : "Parameter Required!"
        })
    }
    try{
        const data = await Brand.findById(id).exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getBrands = async (req, res, next)=>{
    try{
        const data = await Brand.find()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createBrand = async (req, res, next)=>{
    const { brand, brand_description } = req.body
    try{
        const schema = await brandSchema.validateAsync({brand, brand_description })
        const data = await Brand.create(schema)
        res.status(201).json(data)

    }catch(err){
        next(err)
    }
}

const updateBrand = async (req, res, next)=>{
    const { bid } = req.query
    const { brand, brand_description } = req.body
    if(!bid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }
    try{
        const schema = await brandSchema.validateAsync({ brand, brand_description })
        const data = await Brand.findByIdAndUpdate(bid, schema)
        res.status(200).json({
            success : true,
            data
        })

    }catch(err){
        next(err)
    }
}

const removeBrand = async (req, res, nest)=>{
    const { bid } = req.query
    if(!bid){
        return res.status(400).json({
            message : "Query Required!"
        })
    }

    try{
        const data = await Brand.findByIdAndRemove(bid)
        res.status(200).json({
            success : true,
            data
        })
    }catch(err){
        next(err)
    }

}

module.exports = {
    getBrand,
    getBrands,
    createBrand,
    updateBrand,
    removeBrand
}