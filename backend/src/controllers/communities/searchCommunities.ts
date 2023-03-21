import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const searchCommunities = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // get regex from query
    const { name, page }: { name?: string; page?: string } = req.query;
    const pageSize = 10;

    // same logic as getPosts
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

    let numberOfCommunities;
    try {
      // Record<string, string> -> object with string keys and string properties
      numberOfCommunities = await db.Community.count({
        where: {
          name: {
            [db.Sequelize.Op.iLike]: `%${name}%`,
          },
        },
      });
    } catch (error) {
      return next(new ErrorResponse(`Error getting number of communities`, 404));
    }

    let communities;
    try {
      // search for communities with name that matches name
      // if name is empty string, it will return all communities
      communities = await db.Community.findAll({
        where: {
          name: {
            [db.Sequelize.Op.iLike]: `%${name}%`,
          },
        },
        // user
        include: [
          {
            model: db.User,
            attributes: ["userId"],
            // remove CommunityUser
            through: { attributes: [] },
          },
        ],
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      });
    } catch (error) {
      return next(new ErrorResponse(`Error searching communities`, 404));
    }

    const pages = Math.ceil(numberOfCommunities / pageSize);

    res.status(200).json({
      success: true,
      msg: "Successfully searched communities",
      info: {
        pageSize,
        pages,
        numberOfCommunities,
        currentPage: pageNumber,
        next: pageNumber >= pages ? null : `http://localhost:5000/api/communities/search-communities/?page=${pageNumber + 1}&name=${name}`,
        previous:
          pageNumber > pages
            ? `http://localhost:5000/api/communities/search-communities/?page=${pages}&name=${name}`
            : pageNumber === 1
            ? null
            : `http://localhost:5000/api/communities/search-communities/?page=${pageNumber - 1}&name=${name}`,
      },
      communities,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default searchCommunities;
