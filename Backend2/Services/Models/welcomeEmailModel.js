import nodemailer from "nodemailer";
import {Welcome_Email_Template} from "../Src/emailTemplate.js";

export const sendWelcomeEmail = async (email, username) => {
  // You can expand this logic for different user types if needed

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcom to LegalAI.",
    html: Welcome_Email_Template.replace("{name}", username),
  };

  await transporter.sendMail(mailOptions);
};
