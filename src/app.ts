import express from 'express';
import { success } from 'zod';

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to authforge",
    });
});

export default app;