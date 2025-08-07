const mongoose=require("mongoose")
require("dotenv").config()

const uri=process.env.MONGO_URI

async function connectdb(){
    try {
        await mongoose.connect(uri)
        console.log("db server connected")
    } catch (error) {
        console.log("db server failed")
    }
}

module.exports=connectdb