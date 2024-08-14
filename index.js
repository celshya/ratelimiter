const express = require("express")
const {ratelimiter } = require("./middlewares/ratelimiter")
const app = express()
const cors = require("cors")


app.use(cors())
app.use(ratelimiter)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Home Page hitted first time"
    })
    console.log("hitted home")
})

app.listen(8081,()=>{
    console.log("listening at 8081")
})