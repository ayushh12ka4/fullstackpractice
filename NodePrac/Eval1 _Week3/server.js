const express=require("express")
const connectdb = require("./config/db")
const cookieParser=require("cookie-parser")
const authRouter = require("./routers/auth.router")
const reviewRouter = require("./routers/review.router")
const loggerMiddleware = require("./middlewares/logging.middleware")



const app=express()
app.use(loggerMiddleware)
app.use(express.json())
app.use(cookieParser())

// connect db
connectdb()

//server setup
const port=3000
app.listen(port,()=>{
    console.log("server stble")
})
// health
app.use("/health",(req,res)=>{
    res.json({message:"health"})
})
//auth router
app.use("/user",authRouter)


//add review to a lecture in a course
app.use("/review",reviewRouter)