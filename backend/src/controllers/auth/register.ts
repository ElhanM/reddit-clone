import db from "models";
import { Request, Response } from "express";
import { getToken, setCookie } from "utils";

const register = async (req: Request, res: Response) => {
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
    return res
      .status(400)
      .json({ msg: "Email or username already exists. If this is your account, try logging in. Otherwise, try using different credentials." });
  }

  try {
    const user = await db.User.create({
      username,
      email,
      password,
    });

    const token = getToken(user.toJSON);
    if (token) {
      // in process.env.COOKIE_EXPIRE we have number of days, so we need to convert it to milliseconds
      setCookie(res, user.toJSON().userId, token, Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000);
    } else {
      return res.status(500).json({ msg: "Internal server error, token missing" });
    }

    // give back user object without password
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;
    return res.status(200).json({ msg: "Successfully Registered", user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", err });
  }
};

export default register;
