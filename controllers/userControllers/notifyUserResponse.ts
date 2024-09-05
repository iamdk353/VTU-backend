import { Request, Response } from "express";
import notifyUsersList from "./notifyUsersList";

const notifyUserResponse = async (req: Request, res: Response) => {
  const list = (await notifyUsersList()) as [];
  if (list.length > 0) {
    res.json(list);
  } else {
    res.json({ msg: "no subscribed users" });
    return;
  }
};
export default notifyUserResponse;
