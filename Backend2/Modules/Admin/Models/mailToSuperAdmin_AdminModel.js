import client from "../../../config/sqlDB.js";
import nodemailer from "nodemailer";
import { Admin_Request_Email } from "../../../Services/Src/Admin_Request_Email.js";
export const mailSA_A = async (requestDetails) => {
  // console.log(requestDetails);
  try {
    const allSA = await client.query(
      "SELECT email FROM super_admin WHERE is_active = TRUE AND is_delete = FALSE"
    );
    const emails = allSA.rows.map((obj) => obj.email).join(",");
    console.log(emails);

    await sendEmail(emails, requestDetails);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (emails, requestDetails) => {
  // ...same as before...
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: "New Admin Request",
    text: `A new admin request has been made.`,
    html: Admin_Request_Email.replace(/{{username}}/g, requestDetails.username)
      .replace(/{{name}}/g, requestDetails.name)
      .replace(/{{email}}/g, requestDetails.email)
      .replace(/{{profession}}/g, requestDetails.profession)
      .replace(/{{organization}}/g, requestDetails.organization),
  };
  await transporter.sendMail(mailOptions);
};
