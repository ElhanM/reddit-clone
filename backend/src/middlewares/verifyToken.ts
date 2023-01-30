import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "types/express";
import { ErrorResponse } from "utils";

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const token = cookies.split("=")[1];
    if (!token) {
      return next(new ErrorResponse("No token found", 404));
    }
    if (process.env.JWT_SECRET) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return next(new ErrorResponse("Invalid token", 404));
        }
        // to avoid error that userId does not exist on user: string | jwt.JwtPayload | undefined
        const { userId } = user as { userId: string };
        // in order to add userId to req object, we need to add it to the req type, hence the AuthRequest type
        req.userId = userId;
        next();
      });
    } else {
      return next(new ErrorResponse("No environment variable found", 404));
    }
  } else {
    return next(new ErrorResponse("No cookie found", 404));
  }
};

export default verifyToken;
