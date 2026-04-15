const isAdminUser=(req,res,next)=>{
            if(req.userInfo.role!=='admin'){
                // return res.status(403).json({
                //     success:false,
                //     message:'Access denied! Admin rights required.'
                // })
              const error=new Error("Access denied! Admin rights required.")               
              error.statusCode=403
              throw error;
            }
            next();
    }



    // module.exports=isAdminUser
    export default isAdminUser