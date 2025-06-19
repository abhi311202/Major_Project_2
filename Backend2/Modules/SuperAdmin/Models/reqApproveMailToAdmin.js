import client from "../../../config/sqlDB.js";
import nodemailer from "nodemailer";
import { Admin_Request_Accept_Email } from "../../../Services/Src/Admin_Request_Accept_Email.js";

export const reqApproveMailToAdmin = async (AproovedAdmin, SuperAdmin_id) => {
  try {
    console.log(AproovedAdmin, SuperAdmin_id);
    const SA = await client.query(
      "SELECT name, email, username from super_admin where id = $1",
      [SuperAdmin_id]
    );

    const A = await client.query(
      "SELECT name, username, email from admin where id = $1",
      [AproovedAdmin]
    );

    console.log(`Admin whose req is approved:${A}, Super Admin: ${SA}`);

    await sendEmail(A.rows[0], SA.rows[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (Admin, SuperAdmin) => {
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
    to: Admin.email,
    subject: "Admin Request Approved",
    // text: ``,
    html: Admin_Request_Accept_Email.replace(
      /{{superadmin_name}}/g,
      SuperAdmin.name
    )
      .replace(/{{superadmin_username}}/g, SuperAdmin.username)
      .replace(/{{superadmin_email}}/g, SuperAdmin.email)
      .replace(/{{currentYear}}/g, new Date().getFullYear())
      .replace(/{{admin_name}}/g, Admin.username)
      .replace(/{{loginLink}}/g, "www.google.com"),
  };
  await transporter.sendMail(mailOptions);
};
