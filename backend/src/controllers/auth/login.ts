import db from "models";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.toJSON().password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Inavlid password" });
    }

    if (process.env.JWT_SECRET && process.env.COOKIE_EXPIRE) {
      const token = jwt.sign({ userId: user.toJSON().userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      // check if user already has a cookie, if he does delete it
      console.log("req.cookies", req.cookies);
      // clear all cookies from req.cookies object
      // for (const key in req.cookies) {
      //   res.clearCookie(key);
      // }
      const currentCookie = req.cookies[`${user.toJSON().userId}`];
      if (currentCookie) {
        req.cookies[`${user.toJSON().userId}`] = "";
      }
      res.cookie(String(user.toJSON().userId), token, {
        path: "/",
        // in process.env.COOKIE_EXPIRE we have number of days, so we need to convert it to milliseconds
        maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      });

      return res.status(200).json({ message: "Successfully Logged In", user });
    } else {
      return res.status(500).json({ message: "Internal server error, no env variables" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export default login;
