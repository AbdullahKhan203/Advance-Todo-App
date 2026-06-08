import mongoose from "mongoose"
const connectToDb=async()=>{
    // console.log("env",process.env.MONGO_URL);
    
    try {
       await mongoose.connect(process.env.MONGO_URL)
        console.log("database connect successfully");
        
    } catch (error) {
        console.log("database connect failed",error);
        process.exit(1);
        
    }
}

export default connectToDb;