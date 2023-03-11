import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { createPost, getPost, getPostsForUser } from "controllers";
import { PostValidator } from "validation";

const router = express.Router();

router.route("/get-posts").get(verifyToken, getPostsForUser);
router.route("/post/:postId").get(PostValidator.checkGetPost(), handleValidationError(200), verifyToken, getPost);

router.route("/create-post").post(PostValidator.checkCreatePost(), handleValidationError(), verifyToken, createPost);

export default router;
