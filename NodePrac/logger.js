const fs=require("fs")
function loggerMiddleware(req,res,next){
    const log=`${req.method} ${req.url} ${Date.now().toString}`
    fs.appendFileSync("./logs.txt",`/n${log}`)
    next()
}
module.exports=loggerMiddleware