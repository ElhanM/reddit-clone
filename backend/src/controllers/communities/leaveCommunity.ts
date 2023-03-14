import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const getCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const { communityId } = req.body;

    const leaveCommunity = await db.CommunityUser.destroy({
      where: {
        userId,
        communityId,
      },
    });

    res.status(200).json({
      success: true,
      msg: "Successfully left community",
      leaveCommunity,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default getCommunity;
