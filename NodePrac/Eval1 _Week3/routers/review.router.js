const express=require("express")
const addReview = require("../controllers/review.controller")

const authMiddleware = require("../middlewares/auth.middleware")
const reviewRouter=express.Router()





reviewRouter.post("/add",authMiddleware,addReview)

module.exports=reviewRouter