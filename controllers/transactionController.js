
const errors = require("http-errors")
const { commitTransaction } = require("../helper/transaction.helper")
const Transaction = require("../models/transaction.model")

const getTransaction = async (req, res, next)=>{
    const { id } = req.params
    try{
        const data = await Transaction.findById(id).populate("order_by", "-_id profile.fullname").populate('order_reference', "-_id quantity order_status").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const getTransactions = async (req, res, next)=>{
    try{
        const data = await Transaction.find().populate("order_by", "-_id profile.fullname").populate('order_reference', "-_id quantity order_status").exec()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createTransaction = async (req, res, next)=>{
    try{
        const doc = await commitTransaction(req.data._id)
        console.log(doc)
        const data = await Transaction.create(doc)
        res.status(201).json({
            status : true,
            message : "transaction created",
            data
        })
    }catch(err){
        next(err)
    }
}

module.exports = { 
    getTransaction, 
    getTransactions, 
    createTransaction
}
