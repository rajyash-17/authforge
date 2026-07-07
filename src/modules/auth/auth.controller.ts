import { Response,Request } from "express";

import { authService } from "./auth.service";
import { success } from "zod";
import { LoginInput,SignupInput } from "./auth.validation";

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

    async login(
    req: Request<{}, {}, LoginInput>,
    res: Response
    ) {
    const user = await authService.login(req.body);

    return res.status(200).json({
        success: true,
        data: user,
    });
    }

    async me(req: Request, res: Response) {
        return res.status(200).json({
        success: true,
        data: req.user,
    });
}
}

export const authController=new AuthController();