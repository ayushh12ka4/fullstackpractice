const express=require("express")
const connectdb = require("./config/db")
const bookRouter = require("./routers/book.router")
const memberRouter = require("./routers/member.router")

//db connection
connectdb()

//server 
const app=express()
app.use(express.json())

const port=5000
app.listen(port,()=>{
    console.log("server connected")
})

app.use("/health",(req,res)=>{
    console.log('health')
    res.json({message:"healthy"})
})

//routes
app.use("/book",bookRouter)
app.use("/member",memberRouter)



//Return Book (POST /return-book):
// Return a borrowed book, updating the status to available and removing the member from borrowers.
// Remove the book from the member’s borrowedBooks list.
