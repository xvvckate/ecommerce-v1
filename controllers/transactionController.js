
const errors = require("http-errors")
const { commitTransaction } = require("../helper/transaction.helper")
const Transaction = require("../models/transaction.model")

const getTransaction = async (req, res, next)=>{
    try{

    }catch(err){
        next(err)
    }
}

const getTransactions = async (req, res, next)=>{
    try{
        const data = await Transaction.find()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
}

const createTransaction = async (req, res, next)=>{
    try{
        await commitTransaction()
        res.status(201).json({
            status : true,
            message : "transaction created"
        })
    }catch(err){
        next(err)
    }
}

module.exports = { 
    // getTransaction, 
    getTransactions, 
    createTransaction
}
