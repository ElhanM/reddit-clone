import db from "models";
import { NextFunction, Request, Response } from "express";
import { clearCookies, getToken, removePassword, setCookie } from "utils";
import { ErrorResponse } from "utils";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await db.User.findOne({
      where: {
        username,
        email,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return next(
      new ErrorResponse(
        "Email or username already exists. If this is your account, try logging in. Otherwise, try using different credentials.",
        400,
      ),
    );
  }

  try {
    const user = await db.User.create({
      username,
      email,
      password,
    });
    const token = getToken(user.toJSON().userId);

    // req.cookies[`${user.toJSON().userId}`] = "";
    // in a finished app, the end user can only login/register once and then his cookie gets deleted when he signs out
    // in development, we can register/login multiple times, and then one user can have multiple cookies
    // which we don't want/need
    // so we delete all cookies on login and on register
    clearCookies(req, res);

    if (token) {
      // in process.env.COOKIE_EXPIRE we have number of days, so we need to convert it to milliseconds
      setCookie(res, user.toJSON().userId, token);
    } else {
      return next(new ErrorResponse("Internal server error, token missing", 500));
    }

    // give back user object without password
    const userWithoutPassword = removePassword(user.toJSON());
    return res.status(200).json({ success: true, msg: "Successfully Registered", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default register;
