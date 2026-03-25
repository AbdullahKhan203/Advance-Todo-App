import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register controller
const registerUser=async(req,res)=>{
//    console.log("register controller is running");
//    return res.status(200).json({message:"regiser controller running"})   

    try {
        // extract user information from request body
        const {username,email,password,role}=req.body

        // check if user is alreay exist on database
          const checkExistingUser=await User.findOne({$or:[{username},{email}]})
          if(checkExistingUser){
            return res.status(400).json({
                success:false,
                message:"User alredy exists either with same user name or same email. Plz try with a different username or email"
            }) 
          }

        //   hash user passowrd
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        // create a new user and save in your database
        const newlyCreatedUser=new User({
            username,
            email,
            password:hashedPassword,
            role : role || 'user',
        })

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success:true,
                message:"User registered successfully!"
            })
        }else{
               res.status(400).json({
                success:false,
                message:"Unable to registered user please try agian!"
            })
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Some error occured! plz try again"
        })
        
    }
}



// login controller
const loginUser=async(req,res)=>{
    //   res.status(200).json({
    //  message:"login controller working"
    // })
      try {
        const {username,password}=req.body;
    //    chekc if user exist in database or not
    const user=await User.findOne({username});
    if(!user){
      res.status(400).status({
        success:false,
        message:`User doesn't exsit`
      })
    }
   
   const isPasswordMatch=await bcrypt.compare(password,user.password)

   if(!isPasswordMatch){
     res.status(400).status({
        success:false,
        message:'Invalid credentials'
      })
   }

//    create user tokens
const accessTokens=jwt.sign({
    userId:user._id,
    username:user.username,
    role:user.role
},process.env.JWT_SECRET_KEY,{
    expiresIn:'10m'
})


res.status(200).json({
    success:true,
    message:"Logged in successfully",
    accessTokens
})


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Some error occured! plz try again"
        })
        
    }
}



export { registerUser, loginUser };
