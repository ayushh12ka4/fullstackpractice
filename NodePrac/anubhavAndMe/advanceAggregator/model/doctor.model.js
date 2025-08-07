const { default: mongoose } = require("mongoose");






const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String, // e.g., "Cardiologist", "Neurologist"
  experience: Number, // Years of experience
  availability: {type:String,enum:["Monday", "Wednesday", "Friday"]} // ["Monday", "Wednesday", "Friday"]
});

const doctorModel= mongoose.model("Doctor",doctorSchema)
module.exports=doctorModel