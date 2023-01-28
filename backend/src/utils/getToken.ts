import jwt from "jsonwebtoken";
import { IUser } from "models/user";

const getToken = (user: IUser) => {
  if (process.env.JWT_SECRET && process.env.COOKIE_EXPIRE) {
    return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
};

export default getToken;
