const express=require("express")
const addorder = require("../controller/order.controller")

const orderRouter=express.Router()

orderRouter.post("/",addorder)

module.exports=orderRouter