import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const getComments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    const postComments = await db.Comment.findAll({
      where: { postId },
      attributes: { exclude: ["postId", "userId"] },
      include: [
        {
          model: db.User,
          attributes: ["userId", "username"],
        },
      ],
    });

    if (!postComments) {
      return next(new ErrorResponse(`Comments for post with postId: ${postId} not found`, 404));
    }

    res.status(200).json({ success: true, data: postComments });
  } catch (error) {
    next(error);
  }
};

export default getComments;
