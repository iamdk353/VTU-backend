import express from "express";
import circularStatus from "../../controllers/apiContollers/circularStatus";
const apiRouter = express.Router();
apiRouter.get("/status", circularStatus);
export default apiRouter;
