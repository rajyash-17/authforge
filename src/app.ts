import express from 'express';
import { success } from 'zod';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from "./core/middleware/error.middleware";

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to authforge",
    });
});

app.use("/auth",authRoutes)
app.use(errorHandler);

export default app;