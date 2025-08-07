const orderModel = require("../model/order.model")


async function addorder(req,res){
    const neworder=req.body
    try {
        const addedorder=await orderModel.create(neworder)
        console.log(addedorder)
        res.json({messafge:"order added",data:addedorder})
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports=addorder