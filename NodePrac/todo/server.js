const express=require("express")
const app=express()

const fs=require("fs")

app.listen(5176,(req,res)=>{
    console.log("✔ server started at 5176")
})
//good practice-------------------
app.get("/",(req,res)=>{
    console.log("base url running")
    res.json({message:"welconme home"})
})
app.get("/health",(req,res)=>{
    console.log("server healthy")
    res.json({message:"server healthy"})
})
//basic crud-------------
//-----------------------
app.get("/alltodos",(req,res)=>{
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    console.log(data)
    res.json({message:"all todos",response:data})
})
app.use(express.json())
app.post("/addtodo",(req,res)=>{
    const newTask=req.body
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const todoArr=data.todos
    
    const newId=Math.floor(Math.random()*10)
    todoArr.push({id:newId,...newTask})
    fs.writeFileSync("./db.json",JSON.stringify({todos:todoArr}))
    console.log(todoArr)
    
    res.json({message:"task added"})
})

app.delete("/delete/:todoId",(req,res)=>{
    const todoId=Number(req.params.todoId)
    console.log(todoId)
    const data=JSON.parse(fs.readFileSync("./db.json"))
    const todoArr=data.todos
    const index=todoArr.findIndex((el)=>{return el.id==todoId})
    console.log(index)
    if(index==-1){
        res.json({message:"not found"})
    }else{
        const filtered=todoArr.filter((el,i)=>{return i!=index})
        fs.writeFileSync("./db.json",JSON.stringify({todos:filtered}))
        console.log(filtered)
        res.json({message:"deleted"})
    }
    
    
})