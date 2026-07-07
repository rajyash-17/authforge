import { Router } from "express";
import {validate} from "../../core/middleware/validate.middleware"
import { loginSchema,signupSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import { asyncHandler } from "../../core/middleware/async-handler";
import { authMiddleware } from "../../core/middleware/auth.middleware";

const router=Router();

router.post("/signup",validate(signupSchema),asyncHandler(authController.signup));
router.post("/login",validate(loginSchema),asyncHandler(authController.login));
router.get("/me",authMiddleware,asyncHandler(authController.me));

export default router;