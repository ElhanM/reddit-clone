import { Response } from "express";

const setCookie = (res: Response, userId: number, token: string, maxAge: number) => {
  res.cookie(String(userId), token, {
    path: "/",
    maxAge,
    httpOnly: true,
    // only works in https, so don't work in postman
    // but still works in localhost in browser
    // secure: true,
    sameSite: "strict",
  });
};

export default setCookie;
