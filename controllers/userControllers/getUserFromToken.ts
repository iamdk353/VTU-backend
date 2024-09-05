import { responseEncoding } from "axios";
import userModel from "../../model/userModel/userModel";
import { Request, Response } from "express";
const getUserFromToken = async (req: Request, res: Response) => {
  try {
    if (req.userId) {
      const user = await userModel.findById({ _id: req.userId }).select("-__v");
      res.json(user);
    }
  } catch (error) {
    res.json({ msg: "error in finding user" });
  }
};
export default getUserFromToken;
