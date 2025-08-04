const mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:{type:String,min:3},
    author:String,
    status:{type:String,enum:["available","borrowed"],default:"available"},
    borrowers:[{type:mongoose.Schema.Types.ObjectId,ref:"member"}]
},{timestamps:true})

const  bookModel=mongoose.model("book",bookSchema)

module.exports=bookModel