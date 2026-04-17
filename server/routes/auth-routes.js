import express from "express";
import { loginUser, registerUser,refreshToken } from "../controllers/auth-controller.js";

const router = express.Router();


// all routes are related to authentication and authorization
router.post('/register',registerUser)
router.post('/login',loginUser)

router.post("/refresh", refreshToken);



export default router;