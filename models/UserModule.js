const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    startTime:{
        type:String,
        require:true
    },
    endTime:{
        type:String,
        require:true
    }
})

const User  = mongoose.model("User",userschema)
module.exports = User