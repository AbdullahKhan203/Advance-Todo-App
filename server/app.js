// const express = require("express");

// const cors = require("cors");
// const connectDB = require("./config/connectDB.js");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());


// // Test route
// app.get("/", (req, res) => {
//   res.send("MERN server is running");
// });

// // Start server
// app.listen(5000, () => {
//   console.log("Server running on port 5000 🚀");
//   connectDB();
// });



const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://hk7485966_db_user:hk7485966_db_user_gmz@cluster0.rrkxqqh.mongodb.net/').then(()=>{
  console.log("Database connected successfully");
}).catch(e=>console.log(e))


const userSchema=new mongoose.Schema({
  name:String,
  email:String,
  age:Number,
  isActive:Boolean,
  tags:[String],
  createdAt: {type:Date,default:Date.now()}
});


// user model
const User=mongoose.model('User',userSchema)


async function runQueryExample() {
  try {
    const newUser=await User.create({
    name:'Ali',
     email:'abc@gmail.com',
     age:'25',
     isActive:true,
     tags:['Developer'],
     })

     console.log("Created new User",newUser);
     
  } catch (e) {
    console.log('Error->',e);
  }finally{
    await mongoose.connection.close();
  }
  
}

runQueryExample();