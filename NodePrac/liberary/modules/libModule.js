const fs=require("fs")


const getData=()=>{
    return JSON.parse(fs.readFileSync("./db.json"))
}
const writeData=(data)=>{
    fs.writeFileSync("./db.json",JSON.stringify(data))
}

module.exports={getData,writeData}