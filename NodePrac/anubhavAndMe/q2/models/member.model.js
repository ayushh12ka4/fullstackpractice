const mongoose=require("mongoose")

const memberSchema=new mongoose.Schema({
    name:String,
    email:String,
    borrowedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:"book"}]
})
const memberModel=mongoose.model("member",memberSchema)

module.exports=memberModel