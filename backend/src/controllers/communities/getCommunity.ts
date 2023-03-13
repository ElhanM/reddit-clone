import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const getCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { communityId } = req.body;

    const community = await db.Community.findOne({
      where: { communityId },
      include: [
        {
          model: db.User,
          attributes: ["userId"],
          // pervent any further joins
          through: { attributes: [] },
          // we add the line above to stop the CommunityUser table from being included in the response
        },
      ],
    });

    res.status(200).json({
      success: true,
      msg: "Successfully retrieved community",
      community,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default getCommunity;
