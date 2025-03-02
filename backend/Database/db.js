const mongoose =require("mongoose")
const connectDatabase =()=>{
mongoose.connect(process.env.DB_URL).then(()=>{    //
    console.log("db is connected")
}).catch((error)=>{
    console.log(error)
})
}
module.exports=connectDatabase