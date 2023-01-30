import { Request, Response } from "express";

const clearCookies = (req: Request, res: Response) => {
  for (const key in req.cookies) {
    res.clearCookie(key);
  }
};

export default clearCookies;
