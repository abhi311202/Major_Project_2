import client from "../../../config/sqlDB.js";
import nodemailer from "nodemailer";
import moment from "moment";
import { Admin_Request_Reject_Email } from "../../../Services/Src/Admin_Request_Reject_Email.js";
export const reqDeletionMailToAdminApplicant = async (Pending_Request_id) => {
  try {
    const pendingReq = await client.query(
      "SELECT name,email,created_at from pending_admin_req WHERE id=$1",
      [Pending_Request_id]
    );
    await sendEmail(pendingReq.rows[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (pendingRequest) => {
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
    to: pendingRequest.email,
    subject: "Admin Request Rejected",
    // text: ``,
    html: Admin_Request_Reject_Email.replace(/{{name}}/g, pendingRequest.name)
      .replace(/{{email}}/g, pendingRequest.email)
      .replace(
        /{{application_date}}/g,
        moment(pendingRequest.created_at).format("DD MMM YYYY, hh:mm A")
      )
      .replace(/{{currentYear}}/g, new Date().getFullYear()),
  };
  await transporter.sendMail(mailOptions);
};
