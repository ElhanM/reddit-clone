import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const getUserCommunities = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;

    if (userId === undefined) {
      return next(new ErrorResponse("User not found", 404));
    }

    const userCommunities = await db.User.findOne({
      where: { userId },
      attributes: [],
      include: [
        {
          model: db.Community,
          through: { model: db.CommunityUser, attributes: [] },
          attributes: ["communityId", "name", "description", "createdAt"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      msg: "Successfully retrieved user communities",
      communities: userCommunities.Communities,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default getUserCommunities;
