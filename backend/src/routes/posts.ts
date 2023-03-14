import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { createPost, getPost, getPostsForUser } from "controllers";
import { PostValidator } from "validation";

const router = express.Router();

router.route("/get-posts").get(verifyToken, getPostsForUser);

// we need to return 200 and handle the error on the fe due to the default behaviour of rtk query queries
router.route("/post/:postId").get(PostValidator.checkGetPost(), handleValidationError(200), verifyToken, getPost);

router.route("/create-post").post(PostValidator.checkCreatePost(), handleValidationError(), verifyToken, createPost);

export default router;
