import { Response,Request } from "express";

import { authService } from "./auth.service";
import { signupSchema } from "./auth.validation";
import { success } from "zod";

export class AuthController{
    async signup(req:Request,res:Response){
        const data=signupSchema.parse(req.body);

        const user=await authService.signup(data);

        return res.status(201).json({
            success:true,
            data:user,
        });
    }
}

export const authController=new AuthController();