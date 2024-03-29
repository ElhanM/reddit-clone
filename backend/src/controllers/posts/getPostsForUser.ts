import db from "models";
import { NextFunction, Response } from "express";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const getAllPostsForUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const pageSize = 6;
    const { page }: { page?: string } = req.query;
    let pageNumber;
    if (page === undefined) {
      pageNumber = 1;
    } else {
      if (parseInt(page) > 0) {
        pageNumber = parseInt(page);
      } else {
        pageNumber = 1;
      }
    }
    let user;
    try {
      user = await db.User.findOne({
        where: { userId: req.userId },
        attributes: [],
        // here, we are including the communities, but user has no direct relation with communities, so we have to do this through the CommunityUser table
        include: [{ model: db.Community, through: { model: db.CommunityUser, attributes: [] }, attributes: ["communityId"] }],
      });
    } catch (error) {
      return next(new ErrorResponse(`Error finding user with userId: ${req.userId}`, 404));
      // return next(error);
    }
    let postsForUser;
    try {
      // get all user data, and the communities user is in, and all of the posts in those communities
      postsForUser = await db.Post.findAll({
        where: { communityId: user?.Communities.map((community: Record<string, string>) => community.communityId) },
        // exclude the communityId and userId
        attributes: { exclude: ["communityId", "userId"] },
        // add comments
        include: [
          {
            model: db.Comment,
            attributes: ["commentId"],
          },
          {
            model: db.User,
            attributes: ["userId", "username"],
          },
          {
            model: db.Community,
            // attributes: ["communityId", "name"],
          },
          {
            // we are doing this join directly through the PostUpvote table because I added a bunch of extra relations to the model that allow this
            // the other way was not working
            // so called "Super many to many relatioship"
            model: db.PostUpvote,
            attributes: ["userId"],
          },
        ],
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        // newest posts first
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      return next(new ErrorResponse(`Error getting posts for user with userId: ${req.userId}`, 404));
    }
    let numberOfPosts;
    try {
      //TODO sort by newest posts on front end when normalizing state
      // Record<string, string> -> object with string keys and string properties
      numberOfPosts = await db.Post.count({
        where: { communityId: user?.Communities.map((community: Record<string, string>) => community.communityId) },
      });
    } catch (error) {
      return next(new ErrorResponse(`Error getting number of posts for user with userId: ${req.userId}`, 404));
    }

    const pages = Math.ceil(numberOfPosts / pageSize);
    res.status(200).json({
      success: true,
      info: {
        pageSize,
        pages,
        numberOfPosts,
        currentPage: pageNumber,
        next: pageNumber >= pages ? null : `http://localhost:5000/api/posts?page=${pageNumber + 1}`,
        previous:
          pageNumber > pages
            ? `http://localhost:5000/api/posts?page=${pages}`
            : pageNumber === 1
            ? null
            : `http://localhost:5000/api/posts?page=${pageNumber - 1}`,
      },
      // user,
      postsForUser,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllPostsForUser;
