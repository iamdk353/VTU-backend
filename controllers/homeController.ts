import { Request, Response } from "express";
const homeController = (req: Request, res: Response) => {
  res.send("hello home ");
};
export default homeController;
