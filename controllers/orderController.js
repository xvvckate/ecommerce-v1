// const errors = require("http-errors")

// const Product = require("../models/product.model")
// const Order = require("../models/order.model")

// const getOrders = async (req, res, next)=>{
//     try{
//         const data = await Order.find({ user : req.data._id}) 
//         res.status(200).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// const getOrder = async (req, res, next)=>{
//     const { id } = req.params
//     if(!id){
//         return res.status(400).json({
//             message : "Parameter Required!"
//         })
//     }
//     try{
//         const data = await Order.findOne({_id : id})
//         res.status(200).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// const placeOrder = async (req, res, next)=>{
//     const { pid, pd } = req.query
//     if(!pd && !pid ){
//         return res.status(400).json({
//             message : "Query Required!"
//         })
//     }

//     try{
//         const data = await Order.create({
//             user: req.data._id,
//             product : pid,
//             pd,
//             quantity
//         })

//         res.status(201).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// const cancleOrder = async (req, res, next)=>{
//     const { oid } = req.query
//     if(!oid){
//         return res.status(400).json({
//             message : "Quer Required!"
//         })
//     }

//     try{
//         const data = await Order.findByIdAndDelete(oid)
//         res.status(200).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// // const completeOrder = async (req, res)=>{
// //     const { oid } = req.query
// //     if(!oid){
// //         return res.status(400).json({
// //             message : "Query Required!"
// //         })
// //     }

// //     try{

// //     }catch(err){
// //         next(err)
// //     }
// // }

// module.exports = {
//     getOrder,
//     getOrders,
//     placeOrder,
//     cancleOrder
// }