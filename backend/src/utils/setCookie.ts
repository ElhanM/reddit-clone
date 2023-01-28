import { Response } from "express";

const setCookie = (res: Response, userId: number, token: string, maxAge: number) => {
  res.cookie(String(userId), token, {
    path: "/",
    maxAge,
    httpOnly: true,
    sameSite: "lax",
  });
};

export default setCookie;
