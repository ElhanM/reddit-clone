import express from "express";
import { verifyToken } from "middlewares";
import { getMe } from "controllers";

const router = express.Router();

router.route("/get-me").get(verifyToken, getMe);

export default router;
