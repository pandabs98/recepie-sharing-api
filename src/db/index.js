import mongoose from "mongoose";
import { dbname } from "../constants.js";

const connectDB = async ()=>{
    try {
        const instance = await mongoose.connect(`${process.env.MONGO_URI}/${dbname}`)
        console.log("Mongodb connected successfully", instance.connection.host)
    } catch (error) {
        console.error("An error occcured while connecting to DB", error)
    }
}

export default connectDB;