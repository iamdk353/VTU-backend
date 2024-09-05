import userModel from "../../model/userModel/userModel";
import { Request, Response } from "express";
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { notify, name } = req.body;
  try {
    const data = await userModel.findByIdAndUpdate(
      { _id: id },
      { notify, name }
    );
    res.json({ msg: data });
  } catch (error) {
    res.json({ msg: "error in creating the user  " + error });
  }
};
export default updateUser;
