import nodemailer from "nodemailer";
import { Welcome_Email_Template } from "../Src/emailTemplate.js";
import { Super_Admin_Approval_Confirmation_Email_Template } from "../Src/Super_Admin_Approval_Confirmation.js";
import { Super_Admin_Approval_Rejection_Email_Template } from "../Src/Super_Admin_Approval_Rejection.js";
export const sendWelcomeEmail = async (email, username, type) => {
  let sub = "";
  let html1 = "";

  try {
    if (type === "WelcomeUserEmail") {
      sub = "Welcome User!!";
      html1 = Welcome_Email_Template.replace("{name}", username);
    } else if (type === "WelcomeAdminEmail") {
      sub = "Welcome Admin!!";
      html1 = Welcome_Email_Template.replace("{name}", username);
    } else if (type === "WelcomeSuperAdminEmail") {
      sub = "Welcome Super Admin!!";
      html1 = Super_Admin_Approval_Confirmation_Email_Template.replace(
        "{name}",
        username
      );
    } else if (type === "SuperAdminRequestRejected") {
      sub = "Request for Super Admin Upgradation was denied.";
      html1 = Super_Admin_Approval_Rejection_Email_Template.replace(
        "{name}",
        username
      );
    } else if (type === "AdminRequestRejected") {
      sub = "Request for Super Admin Upgradation was approved.";
      html1 = Welcome_Email_Template.replace("{name}", username);
    } else {
      throw new Error("Invalid Mail Type defined.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: process.env.EMAIL_TSL },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: sub,
      html: html1,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
    // Optionally, you can throw or handle the error as needed
  }
};
