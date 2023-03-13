import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { getUserCommunities } from "controllers";
import getCommunity from "controllers/communities/getCommunity";
import { CommunityValidator } from "validation";

const router = express.Router();

router.route("/get-user-communities").get(verifyToken, getUserCommunities);

//can't send body with get request, so we use post
router.route("/get-community").post(CommunityValidator.checkGetCommunity(), handleValidationError(), verifyToken, getCommunity);

export default router;
