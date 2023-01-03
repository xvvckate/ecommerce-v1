require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const errors = require("http-errors")
const { default: mongoose} = require("mongoose")

const { connectDB } = require("./config/dbConfig")
const verifyAuth = require("./middleware/verifyAuth")

const app = express()

connectDB()
mongoose.connection.once("open", ()=>{
    console.log("Connected to Mongoose ...")
}).on("error", (err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/auth", require("./routes/api/auth.router"))
app.use(verifyAuth)

app.use("/user", require("./routes/api/user.router")) 
app.use("/profile", require("./routes/api/profile.router"))
app.use("/brand", require("./routes/api/brand.router"))
app.use("/catagory", require("./routes/api/catagory.router"))
app.use("/item", require("./routes/api/item.router"))
app.use("/item_detail", require("./routes/api/item_detail.router"))
app.use("/comment", require("./routes/api/comment.router"))
app.use("/wishlist", require("./routes/api/wishlist.router"))
app.use("/order", require("./routes/api/order.router"))
app.use("/transaction", require("./routes/api/transaction.router"))

// app.use("/role", require("./routes/api/role.router"))

app.use((req, res, next)=>{
    next(errors.NotFound())
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.json({
        error : {
            status : err.status || 500,
            message : err.message
        }
    })
})

module.exports = app
