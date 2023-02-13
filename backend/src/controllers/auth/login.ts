import db from "models";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { clearCookies, getToken, removePassword, setCookie } from "utils";
import { ErrorResponse } from "utils";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // this fails when user is null, so we don't need to wrap it in a try/catch, we catch that error in the if statement below
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid email", 400));
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.toJSON().password);
    if (!isPasswordCorrect) {
      return next(new ErrorResponse("Invalid password", 400));
    }

    const token = getToken(user.toJSON().userId);

    // req.cookies[`${user.toJSON().userId}`] = "";
    clearCookies(req, res);

    if (token) {
      setCookie(res, user.toJSON().userId, token);
    } else {
      return next(new ErrorResponse("Internal server error, token missing", 500));
    }
    // give back user object without password
    const userWithoutPassword = removePassword(user.toJSON());
    return res.status(200).json({ success: true, msg: "Successfully Logged In", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default login;
