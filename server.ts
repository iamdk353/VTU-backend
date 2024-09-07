import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./Routers/user/userRouter";
import mongoose from "mongoose";
import apiRouter from "./Routers/api/apiRoutes";
import cron from "node-cron";
import axios from "axios";
import circularModel from "./model/circualarModel/circularMode";
import homeController from "./controllers/homeController";
//
const app = express();
const cronExpressions: { [key: string]: string } = {
  "31": "*/31 * * * * *", // Every 31 seconds
  "1": "* * * * *", // Every 1 minute
  "15": "*/15 * * * *", // Every 15 minutes
  "30": "*/30 * * * *", // Every 30 minutes
};
//
app.use(express.json());
app.use(cors());

//
app.get("/", homeController);

app.use("/user", userRouter);
app.use("/api", apiRouter);
const PORT = process.env.PORT || 5000;

console.log("started to connecting to DB");
mongoose
  .connect(process.env.MONGOURL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log("SERVER STARTED AT " + process.env.BASEURL);
      let timeFactor = "30";
      cron.schedule(cronExpressions[timeFactor], async () => {
        console.log("scheduled for " + timeFactor);
        try {
          const response = await axios.get(process.env.BASEURL + "/api/status");

          console.log(timeFactor, process.env.BASEURL + "/api/status");
          console.log("Cron job: API call successful:", response.data);
        } catch (error) {
          console.error("Cron job: API call failed:", error);
        }
      });
    });
  })
  .catch((err) => {
    console.log("error in connecting the server" + err);
  });
