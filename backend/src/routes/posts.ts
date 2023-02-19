import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { createPost, getPostsForUser } from "controllers";
import postValidator from "validation/postValidator";

const router = express.Router();

router.route("/get-posts").get(verifyToken, getPostsForUser);

router.route("/create-post").post(postValidator.checkCreatePost(), handleValidationError, verifyToken, createPost);

export default router;
