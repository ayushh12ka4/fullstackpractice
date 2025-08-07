const express=require("express")
const {doctorAppointments, patientHistory, topDoctor, cancelledPercentage, monthlyAppointments} = require("../controller/analytics.controller")

const analyticsRouter=express.Router()

analyticsRouter.get("/doctors-with-appointments",doctorAppointments)
analyticsRouter.get("/patient-medical-history/:id",patientHistory)
analyticsRouter.get("/top-specialties",topDoctor)
analyticsRouter.get("/cancelled-appointments",cancelledPercentage)
analyticsRouter.get("/monthly-appointments",monthlyAppointments)


module.exports=analyticsRouter
//GET /analytics/active-patients → Identify patients who have visited the hospital more 
// than 3 times in the last 6 months. (Uses $match, $group, $project, $match)