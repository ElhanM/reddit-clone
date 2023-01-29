import db from "models";
import { Response } from "express";
import { AuthRequest } from "types/express";
import { ICommunityUser } from "models/communityUser";

const getAllPostsForUser = async (req: AuthRequest, res: Response) => {
  try {
    const pageSize = 2;
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
    console.log({ pageSize });
    console.log({ pageNumber });
    const user = await db.User.findOne({
      where: { userId: req.userId },
      attributes: [],
      include: [{ model: db.Community, through: { model: db.CommunityUser, attributes: [] }, attributes: ["communityId"] }],
    });
    // get all user data, and the communities user is in, and all of the posts in those communities
    const postsForUser = await db.Post.findAll({
      where: { communityId: user?.Communities.map((community: Record<string, string>) => community.communityId) },
      // add comments
      include: [
        {
          model: db.Comment,
          attributes: ["commentId"],
        },
      ],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    //TODO sort by newest posts on front end when normalizing state
    // Record<string, any> -> object with string keys and any properties
    const numberOfPosts = await db.Post.count({
      where: { communityId: user?.Communities.map((community: Record<string, string>) => community.communityId) },
    });
    console.log({ numberOfPosts });
    const pages = Math.ceil(numberOfPosts / pageSize);
    res.status(200).json({
      info: {
        pageSize,
        numberOfPosts,
        pages,
        currentPage: pageNumber,
        next: pageNumber >= pages ? null : `http://localhost:5000/api/posts?page=${pageNumber + 1}`,
        previous:
          pageNumber >= pages
            ? `http://localhost:5000/api/posts?page=${pages}`
            : pageNumber === 1
            ? null
            : `http://localhost:5000/api/posts?page=${pageNumber - 1}`,
      },
      // user,
      postsForUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error getting posts for user", error });
  }
};

export default getAllPostsForUser;
