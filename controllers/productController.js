
// const errors = require("http-errors")
// const { productSchema } = require("../validation/product.validation")
// const Product = require("../models/product.model")

// const getProducts = async (req, res, next)=>{
//     try{
//         const data = await Product.find().exec()
//         res.status(200).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// const getProduct = async (req, res, next)=>{
//     const { id } = req.params
//     if(!id){
//         return res.status(400).json({
//             message: "Parameter Required!"
//         })
//     }

//     try{
//         const data = await Product.findById(id)
//         res.status(200).json(data)
//     }catch(err){
//         next(err)
//     }
// }

// const addProduct = async (req, res, next)=>{
//     const { pid } = req.query
//     const { color, size, fixPrice, catagory, discountPercent } = req.body
    
//     if(!pid){
//         return res.status(400).json({
//             message : "Query Required!"
//         })        
//     }

//     try{
//         const _ = await productSchema.validateAsync({ 
//             products : [{
//                 color, 
//                 size, 
//                 catagory,
//                 price : {
//                     fixPrice, 
//                     discountPercent
//                 }
//             }] 
//         })

//         const doc = await Product.findById(pid)
//         doc.products.push({
//             color,
//             size,
//             "price.fixPrice" : fixPrice,
//             "price.discountPercent" : discountPercent
//         })
//         await doc.save()
        
//         res.status(201).json(doc)
//     }catch(err){
//         next(err)
//     }
// }

// const updateProduct = async (req, res, next)=>{
//     const { pid } = req.query
//     const { product_id,  color, size, catagory, fixPrice, discountPercent } = req.body
    
//     if(!pid){
//         return res.status(400).json({
//             message : "Query Required!"
//         })        
//     }
//     try{
//         const _ = await productSchema.validateAsync({ 
//             products : [{
//                 color, 
//                 size, 
//                 catagory,
//                 price : {
//                     fixPrice, 
//                     discountPercent
//                 }
//             }]
//         })

//         const doc = await Product.findOne({ _id : product })
//         doc.products.id(product_id).color = color
//         doc.products.id(product_id).size = size
//         doc.products.id(product_id).catagory = catagory
//         doc.products.id(product_id).price.fixPrice = fixPrice
//         doc.products.id(product_id).price.discountPercent = discountPercent 
//         await doc.save()

//         res.status(200).json(doc)

//     }catch(err){
//         next(err)
//     }
// }

// const deleteProduct = async (req, res, next)=>{
//     const { pid } = req.query
//     const { product_id } = req.body
//     if(!pid){
//         return res.status(200).json({
//             message: "Query Required!"
//         })
//     }
//     if(!product_id){
//         return res.status(400).json({
//             message : "Parameter Required!"
//         })
//     }

//     try{
//         const doc = await Product.findOne({_id : pid})

//         if(!doc){
//             return res.status(404).json({
//                 message : "Brand Not Found!"
//             })
//         }
//         if(!doc.products.id(product_id)){
//             return res.status(404).json({
//                 message : "Product Not Found!"
//             })
//         }
        
//         await doc.products.id(product_id)?.remove()
//         await doc.save()
//         res.sendStatus(202)
//     }catch(err){
//         next(err)
//     }
// }

// module.exports = {
//     getProduct,
//     getProducts,
//     addProduct,
//     updateProduct,
//     deleteProduct
// }