import { Router } from "express";
import {validate} from "../../core/middleware/validate.middleware"
import { loginSchema,signupSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import { asyncHandler } from "../../core/middleware/async-handler";

const router=Router();

router.post("/signup",validate(signupSchema),asyncHandler(authController.signup));
router.post("/login",validate(loginSchema),asyncHandler(authController.login));


export default router;