import express from "express";
import { ErrorHandler, verifyToken } from "middlewares";
import { AuthValidator } from "validation";
import { getPostsForUser } from "controllers";

const router = express.Router();

router.route("/get-posts").get(verifyToken, getPostsForUser);

export default router;
