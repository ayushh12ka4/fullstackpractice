const express=require("express")
const adminBooksRouter=express.Router()
const {getData,writeData}=require("../modules/libModule")
const {getAllBooks,addABook,updateABook,deleteABook}=require("../controller/libontroller")

adminBooksRouter.get("/books/getAll",getAllBooks)
adminBooksRouter.post("/books/addbook",addABook)
adminBooksRouter.put("/books/updatebook/:bookid",updateABook)
adminBooksRouter.delete("/deletebook/:bookid",deleteABook)

module.exports={adminBooksRouter}