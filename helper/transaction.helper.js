
const Order = require("../models/order.model")
const Transaction = require("../models/transaction.model")
const ItemDetail = require("../models/item_detail.model")

const { ACTIONS } = require("../config/actionList")

async function commitTransaction(req, res, next){
    let item_total_price = 0, bicker_price = 0, total = 0, total_price = 0;
    let order_list = []
    
    try{
        const orders = await Order.find({ 
            $and : [{ 
                user : req.data.uid, 
                order_status : ACTIONS.IN_PROGRESS 
            }]
        });

        for(let order of orders){
            order_list.push(order._id)
            let item_price, discount_price = 0
            const { item, quantity } = order
            const doc = await ItemDetail.findOne({ _id : item})
            const { price } = doc
            item_price = price.fixPrice * quantity
            if(price.discountPercent > 0){
                let percentage = price.discountPercent/100
                discount_price = item_price * percentage
            }
            total = (item_price - discount_price)
            item_total_price += total
        }   

        bicker_price = 100
        total_price = item_total_price + bicker_price
        await Transaction.create({
            order_by : req.data._id,
            order_reference : order_list,
            item_total_price,
            bicker_price,
            total_price
        })

    }catch(err){
        next(err)
    }
}

module.exports = {
    commitTransaction
}
