import db from "models";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { clearCookies, getToken, setCookie } from "utils";
import { ErrorResponse } from "utils";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return new ErrorResponse("Invalid email", 400);
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.toJSON().password);
    if (!isPasswordCorrect) {
      return next(new ErrorResponse("Invalid password", 400));
    }

    const token = getToken(user.toJSON().userId);

    console.log("req.cookies", req.cookies);
    // req.cookies[`${user.toJSON().userId}`] = "";
    clearCookies(req, res);

    if (token) {
      setCookie(res, user.toJSON().userId, token, Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000);
    } else {
      return next(new ErrorResponse("Internal server error, token missing", 500));
    }
    // give back user object without password
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;
    return res.status(200).json({ success: true, msg: "Successfully Logged In", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default login;
