const { default: mongoose } = require("mongoose");



const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: String // e.g., ["Diabetes", "Hypertension"]
});


const patientModel=mongoose.model("Patient",patientSchema)
module.exports=patientModel