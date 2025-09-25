const express=require('express')
const fs=require("fs")
const app=express()
const port =3000

app.listen(port,()=>{
    console.log("server up")
})
app.use()
app.post("/add",(req,res)=>{
    newtodo=req.body
    const data=JSON.parse(fs.readFileSync("./db.json"))
    const arr=data.todo
    arr.push(newtodo)

})