import client from "../../../config/sqlDB.js";
import nodemailer from "nodemailer";
import moment from "moment";
import { Super_Admin_Request_Reject_Email } from "../../../Services/Src/Super_Admin_Request_Reject_Email.js";

export const SuperAdminReqDeleteMailToAdmin = async (adminId, requestId) => {
  try {
    const A = await client.query("SELECT name,email from admin WHERE id=$1", [
      adminId,
    ]);

    const pendingReq = await client.query(
      "SELECT created_at from pending_sa_req WHERE id=$1",
      [requestId]
    );
    await sendEmail(A.rows[0], pendingReq.rows[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (Admin, pendingRequest) => {
  // ...same as before...
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
    to: Admin.email,
    subject: "Super Admin Request Rejected",
    // text: ``,
    html: Super_Admin_Request_Reject_Email.replace(/{{name}}/g, Admin.name)
      .replace(/{{email}}/g, Admin.email)
      .replace(
        /{{application_date}}/g,
        moment(pendingRequest.created_at).format("DD MMM YYYY, hh:mm A")
      )
      .replace(/{{currentYear}}/g, new Date().getFullYear()),
  };
  await transporter.sendMail(mailOptions);
};
