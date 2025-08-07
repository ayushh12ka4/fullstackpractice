const { default: mongoose } = require("mongoose");




const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  appointmentDate: {type:Date,default:Date.now()},
  status: {type:String,enum:["Scheduled", "Completed", "Cancelled"]} // "Scheduled", "Completed", "Cancelled"
});
const appointmentModel=mongoose.model("Appointment",appointmentSchema)
module.exports=appointmentModel