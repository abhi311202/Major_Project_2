import { generatePhoneOtp, sendPhoneOtpSms, verifyPhoneOtp } from "../Models/phoneAuthModel.js";

export const sendPhoneOtpController = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number is required" });
  try {
    const otp = await generatePhoneOtp(phone);
    await sendPhoneOtpSms(phone, otp);
    res.json({ message: "OTP sent to phone" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyPhoneOtpController = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ error: "Phone and OTP are required" });
  try {
    const valid = await verifyPhoneOtp(phone, otp);
    if (valid) {
      res.json({ message: "Phone verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};