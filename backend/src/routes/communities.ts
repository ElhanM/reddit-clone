import express from "express";
import { handleValidationError, verifyToken } from "middlewares";
import { getUserCommunities, joinCommunity, leaveCommunity } from "controllers";
import getCommunity from "controllers/communities/getCommunity";
import { CommunityValidator } from "validation";

const router = express.Router();

router.route("/get-user-communities").get(verifyToken, getUserCommunities);

router.route("/get-community/:communityId").get(CommunityValidator.checkGetCommunity(), handleValidationError(200), verifyToken, getCommunity);

router.route("/community/join").post(CommunityValidator.checkPostReqCommunity(), handleValidationError(), verifyToken, joinCommunity);
router.route("/community/leave").post(CommunityValidator.checkPostReqCommunity(), handleValidationError(), verifyToken, leaveCommunity);

export default router;
