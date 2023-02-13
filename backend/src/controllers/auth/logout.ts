import { NextFunction, Request, Response } from "express";
import { clearCookies } from "utils";

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearCookies(req, res);

    return res.status(200).json({ success: true, msg: "Successfully Logged Out" });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default logout;
