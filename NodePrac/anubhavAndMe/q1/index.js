const mongoose=require("mongoose")
const express=require("express")


// db connection
const connectdb=async()=>{
   await mongoose.connect("mongodb://127.0.0.1:27017/AnubhavAyush")
   console.log("db stable")
}
connectdb()

//server connection
const app=express()
const port=5000
app.listen(port,()=>{
    console.log("server running")
})
//parser 
app.use(express.json())
//health check
app.get("/health",(req,res)=>{
    console.log("healthy")
    res.json({message:"hell"})
}) 


//student model
const userSchema=new mongoose.Schema({
    name:{type:String, require:true},
    email:String,
    enrolledCourses:[{type:mongoose.Schema.Types.ObjectId, ref:"post"}]
})
const userModel=mongoose.model("user",userSchema)


//course model
const postSchema=new mongoose.Schema({
    name:String,
    description:String,
   enrolledStudends:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
})
const postModel=mongoose.model("post",postSchema)

// controllers and routers

app.post("/enroll",async(req,res)=>{
    const {sid,cid}=req.body         //  stu id,cou id
    try {
       const course = await postModel.findById(cid) 
       course.enrolledStudends.push(sid); 
       await course.save();

       const student=await userModel.findById(sid)
       student.enrolledCourses.push(cid)
       await student.save()
       res.json({message:"done"})
       
    } catch (error) {
       console.log(error.message)
    }
})



//Print all posts, including the author’s name (use .populate() in Mongoose to fetch the related user).
 .map .forEach
[a,b,c,d,e]
