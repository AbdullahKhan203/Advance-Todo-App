// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//        console.log("token in todo middleware",req.headers.authorization);
       
//     const token = req.headers.authorization?.split(" ")[1];
//       console.log("etracted tokken",token);
      
//     if (!token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId);

//     req.user = user;

//     next();

//   } catch (error) {
//     res.status(401).json({ message: "Token invalid" });
//   }
// };




// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {

//     console.log("token in todo middleware", req.headers.authorization);

//     const token = req.headers.authorization?.split(" ")[1];

//     console.log("extracted token", token);

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("decoded token", decoded);

//     const user = await User.findById(decoded.userId);

//     req.user = user;

//     next();

//   } catch (error) {
//     console.log("error", error);
//     res.status(401).json({ message: "Token invalid" });
//   }
// };




import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    console.log("token in todo middleware:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    console.log("extracted token:", token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("decoded token:", decoded);

    const user = await User.findById(decoded.userId);

    console.log("user found:", user);

    req.user = user;

    next();

  } catch (error) {

    console.log("ERROR OCCURRED:", error);

    res.status(401).json({ message: "Token invalid" });

  }
};