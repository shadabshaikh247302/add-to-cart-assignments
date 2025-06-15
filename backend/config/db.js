import mongoose from "mongoose"

export const database_connection = (req,res)=>{
  try {
      const connect = mongoose.connect('mongodb+srv://shadab:shadab123@cluster0.yfvxanf.mongodb.net/')
    if(connect){
     console.log("You have been connect with database!")
    }
  } catch (error) {
    console.log(error)
  }
    
} 