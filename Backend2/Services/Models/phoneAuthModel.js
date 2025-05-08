import client from "../../config/sqlDB.js";
import crypto from "crypto";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

// Generate and store OTP for a phone number
export const generatePhoneOtp = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await client.query(
    `INSERT INTO phone_otps (phone, otp_hash, expires_at, is_verified)
     VALUES ($1, $2, $3, FALSE)
     ON CONFLICT (phone) DO UPDATE SET otp_hash = $2, expires_at = $3, is_verified = FALSE`,
    [phone, otpHash, expiresAt]
  );
  return otp;
};

// Send OTP via SMS using Twilio
export const sendPhoneOtpSms = async (phone, otp) => {
  await twilioClient.messages.create({
    body: `Your OTP code is: ${otp}`,
    from: twilioPhone,
    to: phone,
  });
};

// Verify OTP for a phone number
export const verifyPhoneOtp = async (phone, otp) => {
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const result = await client.query(
    `SELECT * FROM phone_otps WHERE phone = $1 AND otp_hash = $2 AND expires_at > NOW() AND is_verified = FALSE`,
    [phone, otpHash]
  );
  if (result.rowCount > 0) {
    // if(result.rows[0].expires_at > Date.now()){
    //   await client.query(
    //     `UPDATE phone_otps SET verified = TRUE WHERE phone = $1 AND otp_hash = $2`,
    //     [phone, otpHash]
    //   );
    //   return true;
    // }

    await client.query(
      `UPDATE phone_otps SET is_verified = TRUE WHERE phone = $1 AND otp_hash = $2`,
      [phone, otpHash]
    );
    return true;
  }
  return false;
};
