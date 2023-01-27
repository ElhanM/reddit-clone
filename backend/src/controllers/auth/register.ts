import db from "models";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    console.log("email", email);
    existingUser = await db.User.findOne({
      where: {
        email,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    console.log({ existingUser });
    return res
      .status(400)
      .json({ message: "Email or username already exists. If this is your account, try logging in. Otherwise, try using different credentials." });
  }

  try {
    // check if password is 8-32 characters long
    if (password.length < 8 || password.length > 32) {
      return res.status(400).json({ message: "Password must be 8-32 characters long" });
    }
    const user = await db.User.create({
      username,
      email,
      password,
    });
    console.log({ user: user.toJSON() });
    console.log({ user: user.toJSON().userId });
    if (process.env.JWT_SECRET && process.env.COOKIE_EXPIRE) {
      const token = jwt.sign({ userId: user.toJSON().userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      res.cookie(String(user.toJSON().userId), token, {
        path: "/",
        // in process.env.COOKIE_EXPIRE we have number of days, so we need to convert it to milliseconds
        maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      });

      return res.status(200).json({ message: "Successfully Registered", user });
    } else {
      return res.status(500).json({ message: "Internal server error, no env variables" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export default register;
