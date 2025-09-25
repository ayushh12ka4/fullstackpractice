const express=require("express")

const app=express()
const port=3000
app.listen(port,(req,res)=>{
    console.log("server connected")
})

app.use(express.json())


let transactions=[]


//  get all transactions
app.get("/fetchAll",(req,res)=>{
          res.json({message:"data",data:transactions})
})
// get totalBalance
app.get("/totalBalance",(req,res)=>{
    let totalCredit=0
    let totalDebit=0
    transactions.forEach((el)=>{
        console.log(el)
        if(el.type=="credit"){
            totalCredit+=Number(el.amount)
            
        }else{
            totalDebit+=Number(el.amount)
        }
    })
   
    let totalBalance=totalCredit-totalDebit
    
    res.json({message:"totalBalance",data:totalBalance})
})
//add transactions
app.post("/add",(req,res)=>{
     const {amount,type,category}=req.body
     const newTransaction={amount,type,category,tId:Math.random()*100}
     transactions.push(newTransaction)
     res.json({message:"transaction added",data:newTransaction})

})

//delete transactions

app.delete("/delete",(req,res)=>{
    const{ id}=req.body
    
    let updatedTransactions=[...transactions].filter((el)=>el.tid!=id)
    transactions=updatedTransactions
    res.json({message:"transaction deleted",data:transactions})     
    
})

//update transaction

app.patch("/update/:id",(req,res)=>{
    const newFeilds=req.body
    const id=req.params
    
    let updatedTransactions=[...transactions].map(el=>{
        if(el.tId==id){
            return {...el,...newFeilds}
        }else{
            return el
        }

    })
    transactions=updatedTransactions
    res.json({message:"transaction updated",data:transactions})
})

