const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel = require("../models/user.model")


const secret=process.env.JWT_SECRETE_KEY
async function registerUser(req,res){
    const {name,email,password}=req.body
    
    const saltRound=9
    try {
        const hashed=await bcrypt.hash(password,saltRound)
        const addedUser=await new userModel({              
           name,email,password:hashed
        }).save()
        console.log("working")
        res.json({message:"bcrypt working",data:addedUser})
    } catch (error) {
        console.log(error.message)
        res.json({message:"bcrypt not working"})
    }
}


async function loginUser(req,res){
    const {email,password}=req.body
                        
    try {
        const user=await userModel.findOne({email})
        if(!user){
            console.log("user not found")
            res.json({message:"user not found"})
        }
        const verified=await bcrypt.compare(password,user.password)
        if(!verified){
            console.log("wrong password")
            res.json({message:"wrong password"})
        }
        
        const token=jwt.sign({id:user._id,name:user.name},secret)
        //sending token in cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:3600000

        })
        res.json({message:"user verified",verification:verified})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}


module.exports={registerUser,loginUser}