import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { getComments } from "controllers";
import postValidator from "validation/postValidator";

const router = express.Router();

router.route("/get-comments/:postId").get(postValidator.checkGetPost(), handleValidationError(), verifyToken, getComments);

export default router;
