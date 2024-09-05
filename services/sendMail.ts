import nodemailer from "nodemailer";
import circularModel from "../model/circualarModel/circularMode";
import { circular } from "../controllers/apiContollers/updateCircular";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function sendThroughGmail(
  user: string,
  { circularID, pdfLink, title, date }: circular
) {
  const mailOptions = {
    from: "iamdk353@gmail.com",
    to: user,
    subject: "new VTU circular",
    html: `
    <h1>New Circular </h1>
    <p>VTU has released a new <Strong>${circularID}</strong> related to <strong>${title}</strong> on <strong>${date}</strong></p>
    <a href=${pdfLink}>view pdf</a>
    `,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
        reject("error in mailing");
      }
      resolve("sent message successfully");
    });
  });
}

const sendEmails = async (users: string[], circular: circular) => {
  try {
    const results = await Promise.all(
      users.map((user) => sendThroughGmail(user, circular))
    );
    console.log("All emails sent successfully:", results);
  } catch (error) {
    console.error("Error sending some emails:", error);
  }
};

export default sendEmails;
