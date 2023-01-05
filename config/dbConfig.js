const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        
        mongoose.set("strictQuery", true);
        // mongoose.set("strictPopulate", false)
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    connectDB
}