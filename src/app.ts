import express from 'express';
import { success } from 'zod';

import { errorHandler } from "./core/middleware/error.middleware";

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to authforge",
    });
});

app.use(errorHandler);

export default app;