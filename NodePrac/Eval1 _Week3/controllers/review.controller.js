const reviewModel = require("../models/review.model")



async function addReview(req,res){
        const newReview=req.body

        try {
            const addedReview=await new reviewModel(newReview).save()
            console.log("review added")
            res.json({message:"review added",data:addedReview})
        } catch (error) {
            console.log(error.message)
            res.json({message:error.message})
        }
}

module.exports=addReview