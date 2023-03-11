import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { createComment, getComments } from "controllers";
import { CommentValidator, PostValidator } from "validation";

const router = express.Router();

// we check whether postId is a valid uuid string, using the same validator we created for getPost controller
router.route("/get-comments/:postId").get(PostValidator.checkGetPost(), handleValidationError(), verifyToken, getComments);

router.route("/create-comment/:postId").post(CommentValidator.checkCreateComment(), handleValidationError(), verifyToken, createComment);

export default router;
