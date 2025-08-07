
const fs=require("fs")

async function loggerMiddleware(req,res,next){
    

    const log=`${req.method} ${req.url} ${new Date()}`
    await fs.appendFileSync("../logger.txt",`\n${log}`)
    next()
}

module.exports=loggerMiddleware