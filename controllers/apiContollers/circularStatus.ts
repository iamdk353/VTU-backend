import circularModel from "../../model/circualarModel/circularMode";
import ParseMainPage from "../../services/scrapeVtu";
import { Request, Response } from "express";
import updateCircular from "./updateCircular";
import sendEmails from "../../services/sendMail";
import notifyUsersList from "../userControllers/notifyUsersList";
const circularStatus = async (req: Request, res: Response) => {
  try {
    const [storedCircular] = await circularModel.find({});
    const parsedCircular = await ParseMainPage();
    if (parsedCircular.circularID === storedCircular.circularID) {
      res.json({ msg: "no new circular has been released", isNew: false });
      return;
    } else {
      try {
        updateCircular(parsedCircular, storedCircular.circularID as string);
        console.log("sending emails");
        const list = await notifyUsersList();
        if (list) sendEmails(list as string[], parsedCircular);
        res.json({ msg: "new circular has been released", isNew: true });

        return;
      } catch (error) {
        console.log("error occured while updating the circular");
      }
    }
  } catch (error) {
    res.json({ msg: "error in fetcing status" });
  }
};
export default circularStatus;
