import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse } from "utils";
import { AuthRequest } from "types/express";

const createCommunity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;

    const createCommunity = await db.Community.create({
      name,
      description,
    });

    res.status(200).json({
      success: true,
      msg: "Successfully created community",
      createCommunity,
    });
  } catch (err) {
    return next(err);
  }
};

export default createCommunity;
