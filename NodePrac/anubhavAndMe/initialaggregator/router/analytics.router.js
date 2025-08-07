
//GET /analytics/cancellation-rate → Find the percentage of canceled orders.

const express=require("express")
const {topproducts,prodRevenue, cancelPercentage} = require("../controller/analytics.controller")

const analyticsRouter=express.Router()                          


analyticsRouter.get("/top-products",topproducts)
analyticsRouter.get("/revenue-by-category",prodRevenue)
analyticsRouter.get("/cancellation-rate",cancelPercentage)
module.exports=analyticsRouter

