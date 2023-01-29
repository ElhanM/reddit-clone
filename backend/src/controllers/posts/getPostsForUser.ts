import db from "models";
import { Response } from "express";
import { AuthRequest } from "types/express";

const getAllPostsForUser = async (req: AuthRequest, res: Response) => {
  console.log("req.userId", req?.userId);
};

export default getAllPostsForUser;
