const express=require("express")
const connectdb = require("./config/db")
const appointRouter = require("./router/appointment.router")
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
app.use("/appointments",appointRouter)
app.use("/analytics",analyticsRouter)
//GET /analytics/top-specialties → Find the top 3 most booked doctor specialties. (Uses $group, $sort, $limit)