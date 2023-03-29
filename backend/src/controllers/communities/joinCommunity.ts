import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const getCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const { communityId } = req.body;

    // join community using CommunityUser model
    const joinCommunity = await db.CommunityUser.create({
      userId,
      communityId,
    });

    res.status(200).json({
      success: true,
      msg: "Successfully joined community",
      joinCommunity,
    });
  } catch (err) {
    return next(err);
  }
};

export default getCommunity;
