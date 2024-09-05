import userModel from "../../model/userModel/userModel";
import { Request, Response } from "express";
const notifyUsersList = async () => {
  try {
    const users = (
      await userModel.find({ notify: true }).select("email -_id")
    ).map((i) => i.email);
    return users;
  } catch (error) {
    console.log("error in fetcing users ");
    return;
  }
};
export default notifyUsersList;
