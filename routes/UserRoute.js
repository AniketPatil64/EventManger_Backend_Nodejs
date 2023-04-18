const User =  require("../models/UserModule");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/events",async(req,resp)=>{
    const {title,description,location,startTime,endTime} = req.body
try{
   if(title && description && location && startTime && endTime){
    const result = await User({
        title,
        description,
        location,
        startTime,
        endTime
    })
    await result.save();
    resp.status(201).json({
        user:result,
        message:"successfully created the event"
    })
   }else{
    if(!title && !description && !location && !startTime && !endTime){
        resp.status(401).json("all fields are mendatory")
    }else if (!title){
        resp.status(401).json("error : validation error:title is required")
    }else if (!description){
        resp.status(401).json("error : validation error:description is required")
    }else if (!location){
        resp.status(401).json("error : validation error:location is required")
    }else if (!startTime){
        resp.status(401).json("error : validation error:startTime is required")
    }else if (!endTime){
        resp.status(401).json("error : validation error:endTime is required")
    } 
   }
}catch(e){
resp.status(401).json("something went wrong")
}
})

userRouter.get("/events",async(req,resp)=>{
try{
    const result = await User.find()
    resp.status(200).json({
        user:result,
        message:"successfull"
    })
}catch(e){
resp.status(401).json("something went wrong")
}
})

userRouter.get("/events/:id",async(req,resp)=>{
    try{
        const id = req.params.id
        const result = await User.findById(id)
        resp.status(200).json({
            user:result,
            message:"successfull"
        })
    }catch(e){
    resp.status(401).json({error:"there is no event with that id"})
    }
    })

    userRouter.delete("/events/:id",async(req,resp)=>{
        try{
            const id = req.params.id
            const result = await User.findByIdAndDelete(id)
            resp.status(200).json({
                message:"Deleted successfully"
            })
        }catch(e){
        resp.status(204).json("no content avaialble")
        }
        })

userRouter.put("/events/:id",async(req,resp)=>{
            const {title,description,location,startTime,endTime} = req.body
            const id = req.params.id
        try{
           if(title && description && location && startTime && endTime){
            const updateddata = {
                title:title,
                description:description,
                location:location,
                startTime:startTime,
                endTime:endTime
            }
        const result = await User.findByIdAndUpdate(id,updateddata,{new:true})
        await result.save();
            resp.status(201).json({
                user:result,
                message:"successfully updated the event"
            })
           }else{
            if(!title && !description && !location && !startTime && !endTime){
                resp.status(401).json("all fields are mendatory")
            }else if (!title){
                resp.status(401).json("error : validation error:title is required")
            }else if (!description){
                resp.status(401).json("error : validation error:description is required")
            }else if (!location){
                resp.status(401).json("error : validation error:location is required")
            }else if (!startTime){
                resp.status(401).json("error : validation error:startTime is required")
            }else if (!endTime){
                resp.status(401).json("error : validation error:endTime is required")
            } 
           }
        }catch(e){
        resp.status(401).json("something went wrong")
        }
        })

module.exports = userRouter