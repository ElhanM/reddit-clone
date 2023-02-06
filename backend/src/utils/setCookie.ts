import { Response } from "express";

const setCookie = (res: Response, userId: number, token: string) => {
  res.cookie(String(process.env.USER_COOKIE), token, {
    path: "/",
    maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true only works in https, so it doesn't work in postman
    // but still works in localhost in browser
    sameSite: "strict",
  });
};

export default setCookie;
