import express from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js";

const router = express.Router();



// all routes are related to authentication and authorization
router.post('/register',registerUser)
router.post('/login',loginUser)



export default router;