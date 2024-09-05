import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../model/userModel/userModel";
declare global {
  namespace Express {
    interface Request {
      userId: string;
      authId: string;
    }
  }
}
const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token && req.headers.authorization?.startsWith("Bearer")) {
    try {
      const decodeUser = jwt.decode(token) as JwtPayload;

      const userId = await userModel
        .findOne({ authId: decodeUser.sub })
        .select("-_v");
      console.log("user ", userId);
      if (userId) {
        req.userId = userId?._id.toString() as string;
        req.authId = decodeUser.sub as string;
        next();
        return;
      } else {
        return res.status(401).json({ msg: "unauthorized" });
      }
    } catch (error) {
      return res.status(401).json({ msg: "unauthorized to access this page" });
    }
  } else {
    return res.status(401).json({ msg: "token not present " });
  }
};
export default validateUser;
