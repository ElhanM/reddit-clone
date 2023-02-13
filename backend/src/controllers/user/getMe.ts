import db from "models";
import { NextFunction, Response } from "express";
import { ErrorResponse, removePassword } from "utils";
import { AuthRequest } from "types/express";

const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log("user get me hit", { userId: req.userId });
    const user = await db.User.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    const userWithoutPassword = removePassword(user.toJSON());

    return res.status(200).json({ success: true, msg: "Successfully Gotten User Credentials", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default getMe;
