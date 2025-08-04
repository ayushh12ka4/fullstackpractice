const express=require("express")
const app=express()
const fs=require("fs")
const { adminBooksRouter } = require("./adminBooksRouter/aminBooksRouter")
const port=5174
app.listen(port,()=>{
  console.log("server running at 5175")
})
// server checks done-------------
app.get("/",(req,res)=>{
    console.log("home")
    res.json({message:"welcome"})
})
app.get("/health",(req,res)=>{
    console.log("healthy")
    res.json({message:"server healthy"})
})
//---------------------------
//middleware
app.use(express.json())

//module functions------------------------------------
// const getData=()=>{
//     return JSON.parse(fs.readFileSync("./db.json"))
// }
// const writeData=(data)=>{
//     fs.writeFileSync("./db.json",JSON.stringify(data))
// }


//crud----
app.use("/admin",adminBooksRouter)




// app.put("/updatebook/:bookid",(req,res)=>{
//     const newbook=req.body
//     const updateId=Number(req.params.bookid)
//     const data=getData()
//     const books=data.books
//     const index=books.findIndex(el=>el.id==updateId)
//     if(index==-1){
//         res.json({message:"invalid id"})
//     }else{
//         const updated={...books[index],...newbook}
//         books[index]=updated
//         writeData(data)
//         res.json({message:"book update"})
//     }
    
// })
// app.delete("/deletebook/:bookid",(req,res)=>{
//     const newbook=req.body
//     const updateId=Number(req.params.bookid)
//     const data=getData()
//     const books=data.books
//     const index=books.findIndex(el=>el.id==updateId)

//      if(index==-1){
//         res.json({message:"invalid id"})
//     }else{
//         const filtered=books.filter((el,i)=>i!=index)
//         data.books=filtered
//         writeData(data)
//         res.json({message:"deleted"})
//     }
// })