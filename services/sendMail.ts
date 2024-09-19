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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VTU Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 50px;
        background-color: #f4f4f4;
        color: #333;
      }
      h1 {
        color: #eab308;
        font-size: 2rem;
        text-align: center;
      }
      h1 span {
        color: black;
        font-size: 2rem;
        text-align: center;
      }
      h2 {
        color: black;
        font-size: 1.5rem;
        width: 100%;
      }
      p {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.6;
      }
      strong {
        color: #eab308;
      }
      .notification {
        background-color: #fff;
        padding: 50px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 0 auto;
      }
      button {
        padding: 1rem;
        width: 20%;
        border-radius: 10px;
        border: 0px;
        background-color: black;
        color: white;
        font-size: 1rem;
        font: 600;
        box-shadow: 0 2px 4px #333;
      }

      button:hover {
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: white;
      }
    </style>
  </head>
  <body>
      <div class="notification">
        <h1>VTU <span>NOTIFY</span></h1>
        <h2>${title}</h2>
        <p><strong>Post ID:</strong> ${circularID}</p>
        <p><strong>Date:</strong> ${date}</p>
        <a href="${pdfLink}">
          <button>VIEW PDF</button>
        </a>
    </div>
  </body>
</html>
    `,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        //console.error("Error:", error);
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
    //console.log("All emails sent successfully:", results);
  } catch (error) {
    //console.error("Error sending some emails:", error);
  }
};

export default sendEmails;
