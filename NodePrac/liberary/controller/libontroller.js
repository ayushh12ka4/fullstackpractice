const {getData,writeData}=require("../modules/libModule")
const getAllBooks=(req,res)=>{
     
    
    const data=getData()
    console.log(data)
    const books=data.books
    console.log(books)
    res.json({message:"all books",books:books})
}

const addABook=(req,res)=>{
     const newbook=req.body
     
     const newid=Math.floor(Math.random()*10)
     
     const data=getData()
     const books=data.books
     data.books=[...books,{id:newid,...newbook}]
     console.log(data.books)
    
    writeData(data)
    res.json({message:"book added",books:data.books})
}
const updateABook=(req,res)=>{
    const newbook=req.body
    const updateId=Number(req.params.bookid)
    const data=getData()
    const books=data.books
    const index=books.findIndex(el=>el.id==updateId)
    if(index==-1){
        res.json({message:"invalid id"})
    }else{
        const updated={...books[index],...newbook}
        books[index]=updated
        writeData(data)
        res.json({message:"book update"})
    }
    
}
const deleteABook=(req,res)=>{
    const newbook=req.body
    const updateId=Number(req.params.bookid)
    const data=getData()
    const books=data.books
    const index=books.findIndex(el=>el.id==updateId)

     if(index==-1){
        res.json({message:"invalid id"})
    }else{
        const filtered=books.filter((el,i)=>i!=index)
        data.books=filtered
        writeData(data)
        res.json({message:"deleted"})
    }
}
module.exports={getAllBooks,addABook,updateABook,deleteABook}