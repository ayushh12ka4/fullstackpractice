const appointmentModel = require("../model/appointment.model");



async function doctorAppointments(req,res){
    try {
        const appointments=await appointmentModel.aggregate([
            {$lookup:{
                from:"doctors",
                localField:"doctorId",
                foreignField:"_id",
                as:"doctor"
            }},
            {$unwind:"$doctor"},
            {$group:{_id:"$doctor.name",totalAppointments:{$sum:1}}}
        ])
        console.log(appointments)
        res.json({message:"appointments",data:appointments})
    } catch (error) {
         console.log(error.message)
        res.json({message:error.message})
        
        
    }
}

async function patientHistory(req,res){
    const {id}=req.params
    try {
        const history=await appointmentModel.aggregate([
            {$lookup:{
    from:"patients",
    localField:"patientId",
    foreignField:"_id",
    as:"patient"
  }},
  {$unwind:"$patient"},
  {$group:{
    _id:"$patient._id",name:{$first:"$patient.name"},history:{$first:"$patient.medicalHistory"},appointments:{$push:"$_id"}
  }},
      {$match:{_id:id}}
        ])
        res.json({message:"history",data:history})
    } catch (error) {
        res.json({message:error.message})
    }
}



async function topDoctor(req,res){
  try {
      const topDoctor=await appointmentModel.aggregate([
        {$lookup:{
    from:"doctors",
    localField:"doctorId",
    foreignField:"_id",
    as:"doctor"
  }},
  {$unwind:"$doctor"},
  {$group:{
    _id:"$doctor.specialty",totalBookings:{$sum:1}
  }},
  {$sort:{totalBookings:-1}},
  {$limit:3}
      ])
      res.json({message:"top",data:topDoctor})
  } catch (error) {
    res.json({message:error.message})
  }
}


async function cancelledPercentage(req,res){
    try {
        const cancelled=await appointmentModel.aggregate([
            {$lookup:{
    from:"doctors",
    localField:"doctorId",
    foreignField:"_id",
    as:"doctor"
  }},
  {$unwind:"$doctor"},
  {$group:{
    _id:"$doctor.name",totalBookings:{$sum:1},cancelledBooking:{$sum:{$cond:[{$eq:["$status","Cancelled"]},1,0]}}
  }},
  {$project:{
    _id:1,
    totalBookings:1,
    cancelledBooking:1,
    cancelPercentage:{$multiply:[{$divide:["$cancelledBooking","$totalBookings"]},100]}
  }}
        ])
        res.json({message:"cancel percentage",data:cancelled})
    } catch (error) {
        res.json({message:error.message})
    }
}


async function monthlyAppointments(req,res){
    try {
        const monthly=await appointmentModel.aggregate([
             {$group:{_id:{month:{$month:{$toDate:"$appointmentDate"}}},number:{$sum:1}}},
  {$sort:{"_id.month":1}},
  {$project:{
    _id:0,
    month:{$arrayElemAt:[
      ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"],{$subtract:["$_id.month",1]}
    ]},
    number:1 }}
        ])
        res.json({message:"monthly appointments",data:monthly})
    } catch (error) {
        res.json({message:error.message})
    }
}


module.exports={doctorAppointments,patientHistory,topDoctor,cancelledPercentage,monthlyAppointments}
