const express=require("express")
const bookAppointment = require("../controller/appointment.controller")

const appointRouter=express.Router()

appointRouter.post("/",bookAppointment)

module.exports=appointRouter