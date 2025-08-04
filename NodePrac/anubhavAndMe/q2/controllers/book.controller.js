const bookModel = require("../models/book.model")
const memberModel = require("../models/member.model")


async function addBook(req,res){
    const newBook=req.body
    try {
        const createdBook=await bookModel.create(newBook)
        console.log(createdBook)
        res.json({message:"book added",data:createdBook})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}


async function borrow(req,res){
    const {bid,mid}=req.body
    try {
        const bexist=await bookModel.findById(bid)
        if(!bexist){                                                   
            res.json({message:"book does'nt exixt"})
        }
        const mexist=await memberModel.findById(mid)
        if(!mexist){
            res.json({message:"member does'nt exixt"})
        }
        if(bexist.status=="borrowed"){
            res.json({message:"book not available"})
        }
        bexist.borrowers.push(mid)
        bexist.status="borrowed"
        mexist.borrowedBooks.push(bid)
        await bexist.save()
        await mexist.save()
        res.json({message:"borrowed",data:{bexist,mexist}})
    } catch (error) {
        res.json({message:error.message})
    }
}

async function returnBook(req,res){
    const {bid,mid}=req.body
    try {
       const bexist=await bookModel.findById(bid)
        if(!bexist){                                                   
            res.json({message:"book does'nt exixt"})
        }
        const mexist=await memberModel.findById(mid)
        if(!mexist){
            res.json({message:"member does'nt exixt"})
        }
        if(bexist.status=="available"){
            res.json({message:"book is available cannot be returned"})
        } 
        if(!mexist.borrowedBooks.includes(bid)){
             res.json({message:"book borrowed by someone else"})
        }
        
        const arr=mexist.borrowedBooks.filter(el=>el!=bid)
        mexist.borrowedBooks=arr   
         const arr1=bexist.borrowers.filter(el=>el!=mid)
        bexist.borrowers=arr1
        bexist.status="available"
        
        await bexist.save()
        await mexist.save()
        res.json({message:"returned",data:{mexist,bexist}})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}

async function updateBook(req,res){
    const {bookId}=req.params
    const {title,author}=req.body
    console.log(bookId)
    try {
        const updatedbook=await bookModel.findByIdAndUpdate(bookId,{title,author})
        console.log(updatedbook)
        res.json({message:"updated",data:updatedbook})
    } catch (error) {
        res.json({message:error.message})
    }
}
module.exports={addBook,borrow,returnBook,updateBook}
