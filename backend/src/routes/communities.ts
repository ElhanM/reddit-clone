import express from "express";
import { verifyToken } from "middlewares";
import { getUserCommunities } from "controllers";

const router = express.Router();

router.route("/get-user-communities").get(verifyToken, getUserCommunities);

export default router;
