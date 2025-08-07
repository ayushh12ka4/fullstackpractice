const { default: mongoose, model } = require("mongoose");



const orderSchema=new mongoose.Schema({
    username:String,
    productName:String,
    category:String,
    quantity:Number,
    totalPrice:Number,
    orderdate:{type:Date,default:Date.now},
    status:{type:String,enum:["Pending","Shipped","Delivered","Cancelled"]}
})

const orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel