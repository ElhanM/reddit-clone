import db from "models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getToken, setCookie } from "utils";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.toJSON().password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = getToken(user.toJSON().userId);

    // check if user already has a cookie, if he does delete it
    console.log("req.cookies", req.cookies);
    // clear all cookies from req.cookies object

    // req.cookies[`${user.toJSON().userId}`] = "";
    for (const key in req.cookies) {
      res.clearCookie(key);
    }
    if (token) {
      setCookie(res, user.toJSON().userId, token, Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000);
    } else {
      return res.status(500).json({ msg: "Internal server error, token missing" });
    }
    // give back user object without password
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;
    return res.status(200).json({ msg: "Successfully Logged In", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", err });
  }
};

export default login;
