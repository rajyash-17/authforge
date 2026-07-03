import { Response,Request } from "express";

import { authService } from "./auth.service";
import { success } from "zod";
import { SignupInput } from "./auth.validation";

export class AuthController{
    async signup(
        req:Request<{}, {}, SignupInput>,
        res:Response
    ){

        const user=await authService.signup(req.body);

        return res.status(201).json({
            success:true,
            data:user,
        });
    }
}

export const authController=new AuthController();