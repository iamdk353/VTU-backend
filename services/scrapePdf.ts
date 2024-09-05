import axios from "axios";
import * as cheerio from "cheerio";
export async function getPdfLink(link: string) {
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);
  const pdfLink = $(".post-attachment.mime-application-pdf a").attr("href");
  return pdfLink;
}
