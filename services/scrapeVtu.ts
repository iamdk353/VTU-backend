import axios from "axios";
import * as cheerio from "cheerio";
import { getPdfLink } from "./scrapePdf";
async function ParseMainPage() {
  console.log("parsing the main page");

  const url =
    process.env.MAIN_URL || "https://vtu.ac.in/en/category/administration/";
  const { data } = await axios.get(url as string);
  const $ = cheerio.load(data);
  const newCircular = $(
    ".post.type-post.status-publish.format-standard.hentry.category-administration"
  );
  const circularID = newCircular.attr("id");
  const circularDom = cheerio.load(newCircular.html() as string);
  const date = `${circularDom(".entry-day").text().trim()}/${circularDom(
    ".entry-month"
  )
    .text()
    .trim()}`;
  const title = circularDom(".entry-title").text().trim();
  const pdf = circularDom(".readmore a").attr("href");
  const parsedObj = {
    date,
    title,
    pdfLink: (await getPdfLink(pdf as string)) as string,
    circularID: circularID as string,
  };
  return parsedObj;
}
export default ParseMainPage;
