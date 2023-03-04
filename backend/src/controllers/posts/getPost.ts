import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const getPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    const post = await db.Post.findOne({
      where: { postId },
      attributes: { exclude: ["communityId", "userId"] },
      include: [
        {
          model: db.User,
          attributes: ["userId", "username"],
        },
        {
          model: db.Community,
          attributes: ["communityId", "name", "description"],
        },
        {
          model: db.PostUpvote,
          attributes: ["userId"],
        },
        {
          model: db.Comment,
          attributes: ["commentId"],
        },
      ],
    });

    if (!post) {
      return next(new ErrorResponse(`Post with postId: ${postId} not found`, 200));
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export default getPost;
