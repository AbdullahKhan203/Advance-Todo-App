import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import connectToDb from './database/db.js'
import authRoutes from './routes/auth-routes.js'
import homeRoutes from './routes/home-routes.js'
import adminRoutes from './routes/admin-routes.js'
import todoRoutes from './routes/todo-routes.js'
import { errorMiddleware } from "./middleware/error-middleware.js";
import dns from 'dns';
import cors from "cors";
import cookieParser from "cookie-parser";

// Change DNS
dns.setServers(["1.1.1.1","8.8.8.8"]); 

connectToDb();


const app=express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  }));
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

app.use(cookieParser());  

const PORT =  process.env.PORT || 4000;

// Middleware
app.use(express.json()); // very important for parsing JSON body
app.use('/api/auth', authRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/todo', todoRoutes)

app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})

