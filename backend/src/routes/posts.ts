import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { getPostsForUser } from "controllers";

const router = express.Router();

router.route("/get-posts").get(verifyToken, getPostsForUser);

export default router;
