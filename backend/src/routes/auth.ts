import express from "express";
import { handleValidationError } from "middlewares";
import { AuthValidator } from "validation";
import { register, login, logout } from "controllers";

const router = express.Router();

router.route("/register").post(AuthValidator.checkRegister(), handleValidationError, register);
router.route("/login").post(AuthValidator.checkLogin(), handleValidationError, login);
router.route("/logout").post(logout);

export default router;
