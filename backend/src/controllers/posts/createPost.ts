import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, communityId } = req.body;
    const { userId } = req;

    if (userId === undefined) {
      return next(new ErrorResponse("User not found", 404));
    }
    if (communityId === undefined) {
      return next(new ErrorResponse("Community not found", 404));
    }

    const post = await db.Post.create({
      title,
      description,
      communityId,
      userId,
    });

    res.status(201).json({
      success: true,
      msg: "Post created",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export default createPost;
