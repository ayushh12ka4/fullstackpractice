const mongoose=require("mongoose")
require("dotenv").config()

const uri=process.env.MONGO_URL

async function connectdb(){
    try {
        await mongoose.connect(uri)
        console.log("dbserver connected")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=connectdb