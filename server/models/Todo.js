import mongoose from 'mongoose';

const Todo=new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{
        type:String,
        required:[true,"description is required"],
    },
    description:{
         type:String,
        required:[true,"description is required"],
    },
    location:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    status:{
        type:String,
        enum:["pending","inProgress","done"],
       default:"pending",
    },
    catagory:{
        type:String,
        enum:["personal", "delegate"],
        required:true,
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium",
    },
    time:{
        type:String,
        required:true,
    },

},{timestamps:true});

export default mongoose.model("Todo",Todo)
