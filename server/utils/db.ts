import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async()=>{
    mongoose.connect(process.env.DB_URL||"")
    .then(()=>console.log("mongodb connected successfully!"))
    .catch((err)=>console.log(err.message))
}

export default connectDB;