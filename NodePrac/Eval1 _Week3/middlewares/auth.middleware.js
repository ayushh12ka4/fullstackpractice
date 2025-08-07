const secret=process.env.JWT_SECRETE_KEY
const jwt=require("jsonwebtoken")


async function authMiddleware(req,res,next){
     const tokenFromCookie=req.cookies.token
     try {
        const decoded= await jwt.verify(tokenFromCookie,secret)
        console.log(decoded)
        req.user=decoded
        
        next()
     } catch (error) {
        console.log(error.message)
        res.json({message:error.message})
     }
}

module.exports=authMiddleware