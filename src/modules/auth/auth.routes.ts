import { Router } from "express";
import {validate} from "../../core/middleware/validate.middleware"
import { signupSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router=Router();

router.post("/signup",validate(signupSchema),authController.signup);

export default router;