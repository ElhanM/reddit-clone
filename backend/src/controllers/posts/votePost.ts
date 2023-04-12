import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const votePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { postId, userId } = req.body;
    const post = await db.Post.findByPk(postId);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    // find userId and postId pair in postUpvotes table
    // if it exists, delete it
    // if it doesn't exist, create it
    const postUpvote = await db.PostUpvote.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (postUpvote) {
      await postUpvote.destroy();
    } else if (!postUpvote) {
      await db.PostUpvote.create({
        postId,
        userId,
      });
    }

    res.status(200).json({
      success: true,
      msg: "Post upvote toggled",
    });
  } catch (error) {
    next(error);
  }
};

export default votePost;
