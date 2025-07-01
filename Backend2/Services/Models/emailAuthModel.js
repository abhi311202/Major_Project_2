import client from "../../config/sqlDB.js";
import nodemailer from "nodemailer";
import { Verification_Email_Template } from "../Src/emailTemplate.js";

export const generateOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
  await client.query(
    "INSERT INTO email_otps (email, otp, expires_at) VALUES ($1, $2, $3)",
    [email, otp, expiresAt]
  );
  return otp;
};

export const verifyOtp = async (email, otp) => {
  const result = await client.query(
    "SELECT * FROM email_otps WHERE email = $1 AND otp = $2 AND expires_at > NOW()",
    [email, otp]
  );
  console.log(result);
  if (result.rowCount > 0) {
    if (result.rows[0].expires_at > Date.now()) {
      await client.query(
        "UPDATE email_otps SET verified = TRUE WHERE email = $1 AND otp = $2",
        [email, otp]
      );
      return true;
    }
  }
  return false;
};

export const sendOtpEmail = async (email, otp) => {
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
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: Verification_Email_Template.replace("{verificationCode}", otp),
  };
  await transporter.sendMail(mailOptions);
};
