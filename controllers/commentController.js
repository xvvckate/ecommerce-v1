const errors = require("http-errors")
const Item = require("../models/item.model")

const getComments = async (req, res, next)=>{
    const { iid } = req.query
    if(!iid) return errors.BadRequest()
    // iid - item detail id
    try{
        const doc = await Item.findById(iid).select("-_id comments").exec()
        res.status(200).json(doc)
    }catch(err){
        next(err)
    }
}

const createComment = async (req, res, next)=>{
    const { iid } = req.query
    const { comment, ratting } = req.body
    if(!iid) return errors.BadRequest()

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
    if(!iid || !cid) return errors.BadRequest()

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
    if(!iid || !cid) return errors.BadRequest()

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
    getComments,
    createComment,
    updateComment,
    deleteComment
}
