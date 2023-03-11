import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { comment } = req.body;
    const { userId } = req;
    const { postId } = req.params;

    if (!userId) {
      throw new ErrorResponse("User is not logged in", 401);
    }

    const newComment = await db.Comment.create({
      comment,
      userId,
      postId,
    });

    res.status(201).json({
      success: true,
      msg: "Comment created",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export default createComment;
