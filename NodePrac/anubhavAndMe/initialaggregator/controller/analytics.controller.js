// GET /analytics/top-products → Find the top 3 best-selling products based on total quantity sold.

const orderModel = require("../model/order.model");

async function topproducts(req,res){

     try {
        const topProd=await orderModel.aggregate([
            {$group:{_id:"$productName",quant:{$sum:"$quantity"}}},
            {$sort:{quant:-1}},
            {$limit:3}
        ])
        console.log(topProd)
        res.json({message:"top products",data:topProd})


     } catch (error) {
        res.json({message:error.message})
     }

}

async function prodRevenue(req,res){
    try {
       const revenuedetail=await orderModel.aggregate([
        {$group:{_id:"$category",revenue:{$sum:"$totalPrice"}}}
       ]) 
        console.log(revenuedetail)
        res.json({message:"revenue details",data:revenuedetail})
    } catch (error) {
        res.json({message:error.message})
    }
}
//GET /analytics/cancellation-rate → Find the percentage of canceled orders.

async function cancelPercentage(req,res){
    try {
        const canceledPer=await orderModel.aggregate([
            {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          canceledOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          canceledOrders: 1,
          cancellationRate: {
            $multiply: [
              { $divide: ["$canceledOrders", "$totalOrders"] },
              100
            ]
          }
        }
      }
                     
        
           
        ])
         console.log(canceledPer)
        res.json({message:"cancellation details",data:canceledPer})
    } catch (error) {
         res.json({message:error.message})
    }
}


module.exports={topproducts,prodRevenue,cancelPercentage}
