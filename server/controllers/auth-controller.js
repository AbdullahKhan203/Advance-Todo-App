import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../utills/asyncHandler.js";
import { loginUserService,registerUserService } from '../services/authService.js'; 
import Joi from 'joi'
import {validateSignup} from '../validator.js'
import jwt from "jsonwebtoken";

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



// const loginUser=asyncHandler(async (req,res)=>{
//         const {username,password}=req.body;

// const result=await loginUserService({username,password,res});


// res.status(200).json({
//     success:true,
//     message:result.message,
//     accessTokens:result.accessTokens,
//     refreshToken:result.refreshToken
// })

// });


const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await loginUserService({ username, password });

  // ✅ YAHI PAR SET HOTI HAI COOKIE (IMPORTANT)
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,   // production me true
    sameSite: "lax", // strict ki jagah lax better hota hai dev me
  });

  res.status(200).json({
    success: true,
    message: result.message,
    accessTokens: result.accessTokens,
  });
});


const refreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
     
    console.log("cookies:", req.cookies);
    console.log("refreshToken:", req.cookies.refreshToken);
    console.log("Using secret:", process.env.JWT_REFRESH_KEY);

    if (!token) {
      const error = new Error("No refresh token found");
      error.statusCode = 401;
      throw error;
    }

    // verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    // create new access token
    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (error) {
    const err = new Error("Invalid or expired refresh token");
    err.statusCode = 401;
    throw err;
  }
});



export { registerUser, loginUser, refreshToken };
