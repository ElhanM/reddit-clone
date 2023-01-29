import express from "express";
import { ErrorHandler } from "middlewares";
import { AuthValidator } from "validation";
import { register, login } from "controllers";

const router = express.Router();

router.route("/register").post(AuthValidator.checkRegister(), ErrorHandler.handleValidationError, register);
router.route("/login").post(AuthValidator.checkLogin(), ErrorHandler.handleValidationError, login);

export default router;
