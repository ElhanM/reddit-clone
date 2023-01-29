import jwt from "jsonwebtoken";

const getToken = (userId: string) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
};

export default getToken;
