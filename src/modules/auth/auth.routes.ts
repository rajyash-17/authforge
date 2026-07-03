import { Router } from "express";
import {validate} from "../../core/middleware/validate.middleware"
import { signupSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import { asyncHandler } from "../../core/middleware/async-handler";

const router=Router();

router.post("/signup",validate(signupSchema),asyncHandler(authController.signup));

export default router;