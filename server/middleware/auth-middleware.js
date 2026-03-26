import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utills/asyncHandler.js';
// const authMiddleware=(req,res,next)=>{
//     const authHeader=req.headers['authorization']
//     console.log(authHeader);
//     const token=authHeader && authHeader.split(" ")[1]

//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:"Access denied.No token provided.Plz login to continue"
//         })
//     }

//     // decode this token
//     try {
//         const decodedTokenInfo=jwt.verify(token,process.env.JWT_SECRET_KEY)
//         console.log(decodedTokenInfo);
//         req.userInfo=decodedTokenInfo;
//         next();
//     } catch (error){
//         return  res.status(500).json({
//             success:false,
//             message:"Access denied.No token provided.Plz login to continue"
//         })
//     }
// }
// module.exports=authMiddleware





const authMiddleware=asyncHandler((req,res,next)=>{
    const authHeader=req.headers['authorization']
    console.log(authHeader);
    const token=authHeader && authHeader.split(" ")[1]

    if(!token){
        // return res.status(401).json({
        //     success:false,
        //     message:"Access denied.No token provided.Plz login to continue"
        // })
        const error=new Error("Access denied.No token provided.Plz login to continue")
        error.statusCode=401;
        throw error;
    }

    // decode this token
        const decodedTokenInfo=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodedTokenInfo);
        req.userInfo=decodedTokenInfo;
        next();
    // catch (error){
    //     return  res.status(500).json({
    //         success:false,
    //         message:"Access denied.No token provided.Plz login to continue"
    //     })
    // }
})
export default authMiddleware;


