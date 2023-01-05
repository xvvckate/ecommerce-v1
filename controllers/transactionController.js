
const errors = require("http-errors")
const { commitTransaction } = require("../helper/transaction.helper")
const Transaction = require("../models/transaction.model")

const getTransaction = async (req, res, next)=>{
    const { id } = req.params
    try{
        const doc = await Transaction.findById(id).populate({ path : "order_by", select : "-_id profile.fullname"}).populate({path : 'order_reference', populate : { path : "item", populate : { path : "item", select:"-_id item brand", populate : { path : "brand"}}}}).exec()
        const { _id, order_by, item_total_price, total_price, bicker_price, order_reference } = doc
        const { profile } = order_by
        const { firstname, middlename, lastname } = profile?.fullname     
        const data = {
            transaction_reference : _id,
            order_by : `${firstname} ${middlename} ${lastname}`,
            numeber_of_orders : order_reference.length,
            orders : order_reference.map(order=>{
                const { price, color, size, item } = order?.item
                
                return {
                    item_name : item?.item,
                    brand_nam : item?.brand.brand,
                    color,
                    size,
                    quantity : order?.quantity,
                    fixed_price : price?.fixPrice,
                    discount_percent : `${price?.discountPercent}%`
                }

            }),
            item_total_price,
            bicker_price,
            total_price, 
        }

        res.status(200).json(data)
        
    }catch(err){
        next(err)
    }
}

const getTransactions = async (req, res, next)=>{
    try{
        const docs = await Transaction.find().populate({ path : "order_by", select : "-_id profile.fullname"}).populate({path : 'order_reference', populate : { path : "item", populate : { path : "item", select:"-_id item brand", populate : { path : "brand"}}}}).exec()
        const data = docs.map(doc=>{
            const { _id, order_by, item_total_price, total_price, bicker_price, order_reference } = doc
            const { profile } = order_by
            const { firstname, middlename, lastname } = profile?.fullname     
            return {
                transaction_reference : _id,
                order_by : `${firstname} ${middlename} ${lastname}`,
                numeber_of_orders : order_reference.length,
                orders : order_reference.map(order=>{
                    const { price, color, size, item } = order?.item
                    
                    return {
                        item_name : item?.item,
                        brand_nam : item?.brand.brand,
                        color,
                        size,
                        quantity : order?.quantity,
                        fixed_price : price?.fixPrice,
                        discount_percent : `${price?.discountPercent}%`
                    }

                }),
                item_total_price,
                bicker_price,
                total_price, 
            }
        })
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
