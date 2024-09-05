import mongoose from "mongoose";
const circularObj = {
  date: String,
  title: String,
  pdfLink: String,
  circularID: String,
};
const circularSchema = new mongoose.Schema(circularObj);
const circularModel = mongoose.model("circulars", circularSchema);
export default circularModel;
