const express=require("express")
const { addBook, borrow, returnBook, updateBook } = require("../controllers/book.controller")


const bookRouter=express.Router()

bookRouter.post("/add",addBook)
bookRouter.post("/borrow-book",borrow)
bookRouter.post("/return-book",returnBook)
bookRouter.put("/update-book/:bookId",updateBook)

module.exports=bookRouter

// Get Member Borrowed Books (GET /member-borrowed-books/:memberId):

// Retrieve all books a member has borrowed using .populate().