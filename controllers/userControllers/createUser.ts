import userModel from "../../model/userModel/userModel";
import { Request, Response } from "express";
const createUser = async (req: Request, res: Response) => {
  const { email, authId, name, image } = req.body;
  try {
    const found = await userModel.findOne({ email });
    if (found) {
      return res.json({ msg: found });
    }
    const data = await userModel.create({ email, authId, name, image });
    res.json({ msg: data });
  } catch (error) {
    res.json({ msg: "error in creating the user  " + error });
  }
};
export default createUser;
