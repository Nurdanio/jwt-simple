import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedData = jwt.verify(token, "some-secret-key");

    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    // @ts-ignore
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
