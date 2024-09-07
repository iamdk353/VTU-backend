import { Request, Response, NextFunction } from "express";
const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@gmail\\.com$");
  if (emailRegex.test(email)) {
    next();
  } else {
    //console.log("Invalid Gmail address");
    res.json({ msg: "invalid email format" });
    return;
  }
};
export default validateEmail;
