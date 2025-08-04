const memberModel = require("../models/member.model")



async function addMember(req,res){
    const newMember=req.body
    try {
        const createdmember=await memberModel.create(newMember)
        console.log(createdmember)
        res.json({message:"member added",data:createdmember})
    } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
    }
}

async function memberBooks(req,res){
    const {memberId}=req.params
    try {
        const member=await memberModel.findById(memberId).populate("borrowedBooks","title-_id")
        if(!member){
            res.json({message:"member does not exixt"})
        }
        console.log(member)
        res.json({message:"member",data:member})
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports = { addMember, memberBooks }