const errors = require("http-errors")
const Item = require("../models/item.model")

const createComment = async (req, res, next)=>{
    const { iid } = req.query
    const { comment, ratting } = req.body
    if(!iid){
        return res.status(400).json({
            message: "Query Required!"
        })
    }

    try{
        const doc = await Item.findOne({ _id : iid })
        await doc.comments.push({ user : req.data._id, comment, ratting })
        const data = await doc.save()
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
}

const updateComment = async (req, res, next)=>{
    const { iid, cid } = req.query
    const { comment, ratting } = req.body
    if(!iid || !cid){
        return res.status(400).json({
            message: "Query Required!"
        })
    }

    try{
        const doc = await Item.findOne({  _id : iid })
        const data = await doc.comments.filter(comment=> comment._id == cid && comment.user == req.data._id)
        if(data){
            doc.comments.id(cid).comment = comment
            doc.comments.id(cid).ratting = ratting
            await doc.save()
        }
        res.status(202).json(doc)

    }catch(err){
        next(err)
    }
}

const deleteComment = async (req, res, next)=>{
    const { iid, cid } = req.query
    if(!iid || !cid){
        return res.status(400).json({
            message: "Query Required!"
        })
    }

    try{
        const doc = await Item.findOne({  _id : iid })
        const data = await doc.comments.filter(comment=> comment._id == cid && comment.user == req.data._id)
        if(data){
            await doc.comments.id(cid).remove()
            await doc.save()
        }

        res.status(204).json(doc)
    }catch(err){
        next(err)
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
}
