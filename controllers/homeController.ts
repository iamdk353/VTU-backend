import { Request, Response } from "express";
const homeController = (req: Request, res: Response) => {
  res.send("server is alive");
};
export default homeController;
