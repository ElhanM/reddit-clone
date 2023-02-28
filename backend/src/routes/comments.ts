import express from "express";
import { verifyToken } from "middlewares";
import { getComments } from "controllers";

const router = express.Router();

router.route("/get-comments/:postId").get(verifyToken, getComments);

export default router;
