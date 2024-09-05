import circularModel from "../../model/circualarModel/circularMode";
import { Request, Response } from "express";
export type circular = {
  date: string;
  title: string;
  pdfLink: string;
  circularID: string;
};
const updateCircular = async (
  { date, title, pdfLink, circularID }: circular,
  prevID: string
) => {
  try {
    await circularModel.findOneAndUpdate(
      { circularID: prevID },
      { date, title, pdfLink, circularID }
    );
  } catch (error) {
    throw new Error();
  }
};
export default updateCircular;
