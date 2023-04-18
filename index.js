const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors");

const userRouter = require("./routes/UserRoute")


dotenv.config();

//middlewares;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

app.use("/welcome",(req,resp)=>{
resp.json("hello")
})

app.use("/POST/v1",userRouter);
app.use("/GET/v1",userRouter);
app.use("/DELETE/v1",userRouter);
app.use("/PUT/v1",userRouter);


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to database")
}).catch((e)=>{
    console.log("error to connected",e)
})

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${5000}`)
})

