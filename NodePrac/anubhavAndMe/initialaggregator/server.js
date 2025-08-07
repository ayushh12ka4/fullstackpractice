const express=require("express")
const connectdb = require("./config/db")
const orderRouter = require("./router/order.router")
const analyticsRouter = require("./router/analytics.router")

//db connection
connectdb()

//server 
const app=express()
const port=5000
app.listen(port,()=>{
    console.log("server actve")
})
app.use(express.json())

app.get("/health",(req,res)=>{
    res.json({message:"health"})
})

// routes
app.use("/order",orderRouter)
app.use("/analytics",analyticsRouter)