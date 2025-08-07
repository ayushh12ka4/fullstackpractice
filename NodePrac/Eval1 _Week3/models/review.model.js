const { default: mongoose } = require("mongoose");
const userModel = require("./user.model");



const reviewSchema=new mongoose.Schema({
    courseId:String,
    lecturId:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:userModel},
    review:String,
    rating:{type:Number,min:1,max:5}
})
const reviewModel=mongoose.model("lectureReview",reviewSchema)

module.exports=reviewModel