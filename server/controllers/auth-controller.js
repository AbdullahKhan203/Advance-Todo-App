import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utills/asyncHandler.js";
import { loginUserService,registerUserService } from '../services/authService.js'; 
import Joi from 'joi'
import {validateSignup} from '../validator.js'

// const {registerUserService,login}=authServices



const registerUser = asyncHandler(async (req, res) => {
 const { error, value } = validateSignup(req.body);

if (error) {
  const err = new Error(error.details[0].message);
  err.statusCode = 400;
  throw err;
}

  
  const { username, email, password, role } = req.body;

  // if(username.length<3){
  //   let error=new Error("username must be atleast 3 characters long")
  //   error.statusCode=200;
  //   throw error;
  // }

  // if(email.length==null){
  //   let error=new Error("")
  // }

  // if(password.length<6){
  //    let error=new Error("password must be atleast 6 characters long")
  //   error.statusCode=200;
  //   throw error;
  // }
  
   const result = await registerUserService({
    username,
    email,
    password,
    role,
  });

  res.status(201).json({
    success: true,
    message: result.message,
  });
  

  // const checkExistingUser = await User.findOne({
  //   $or: [{ username }, { email }],
  // });

  // if (checkExistingUser) {
  //   const error = new Error(
  //     "User already exists with same username or email"
  //   );
  //   error.statusCode = 400;
  //   throw error; 
  // }

  
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  
  // const newlyCreatedUser = new User({
  //   username,
  //   email,
  //   password: hashedPassword,
  //   role: role || "user",
  // });

  // await newlyCreatedUser.save();

  // if (!newlyCreatedUser) {
  //   const error = new Error("Unable to register user, try again");
  //   error.statusCode = 400;
  //   throw error;
  // }

  
  // res.status(201).json({
  //   success: true,
  //   message: "User registered successfully!",
  // });

});



const loginUser=asyncHandler(async (req,res)=>{
        const {username,password}=req.body;

const result=await loginUserService({username,password});


res.status(200).json({
    success:true,
    message:result.message,
    accessTokens:result.accessTokens
})

        
    //    chekc if user exist in database or not
//     const user=await User.findOne({username});
//     if(!user){
//        let error=new Error("User doesn't exsit")
//        error.statusCode=400
//        throw error;
//     }
   
//    const isPasswordMatch=await bcrypt.compare(password,user.password)

//    if(!isPasswordMatch){
//     let error=new Error("Invalid credentials")
//     error.statusCode=400
//     throw error
//    }

// //    create user tokens
// const accessTokens=jwt.sign({
//     userId:user._id,
//     username:user.username,
//     role:user.role
// },process.env.JWT_SECRET_KEY,{
//     expiresIn:'10m'
// })


// res.status(200).json({
//     success:true,
//     message:"Logged in successfully",
//     accessTokens
// })

});



export { registerUser, loginUser };
