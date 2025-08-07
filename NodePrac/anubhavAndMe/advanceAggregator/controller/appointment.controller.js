const appointmentModel = require("../model/appointment.model")


async function bookAppointment(req,res){
    const newAppointment=req.body
    try {
        const created=await appointmentModel.create(newAppointment)
        console.log(created)
        res.json({message:"created",data:created})
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports=bookAppointment