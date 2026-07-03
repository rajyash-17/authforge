import { Response,Request } from "express";

import { authService } from "./auth.service";
import { success } from "zod";

export class AuthController{
    async signup(req:Request,res:Response){

        const user=await authService.signup(req.body);

        return res.status(201).json({
            success:true,
            data:user,
        });
    }
}

export const authController=new AuthController();