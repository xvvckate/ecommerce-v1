const errors = require("http-errors")
const User = require("../models/user.model")
const ItemDetail = require("../models/item_detail.model")

const getWishList = async (req, res, next)=>{
    try{
        const data = await User.findById(req.data._id)
        res.status(200).json(data?.wishlist)
    }catch(err){
        next(err)
    }
}

const addToWishList = async (req, res, next)=>{
    const { iid } = req.query
    if(!iid) throw errors.BadRequest()

    try{
        const itemDetail = await ItemDetail.findOne({ _id : iid})
        if(!itemDetail) throw errors.BadRequest()

        const doc = await User.findOne( { _id : req.data._id })
        doc.wishlist.push(itemDetail._id)
        const data = await doc.save()
        res.status(201).json(data)
        
    }catch(err){
        next(err)
    }
}

const removeFromWishList = async (req, res, next)=>{
    const { iid } = req.query
    if(!iid) throw errors.BadRequest()

    try{
        const doc = await User.findOne({
            _id : req.data._id, 
            whishlist : iid
        })
        
        doc.wishlist.remove(iid)
        const data = await doc.save()
        res.json(data)
    }catch(err){
        next(err)
    }
}

module.exports = {
    getWishList,
    addToWishList,
    removeFromWishList
}