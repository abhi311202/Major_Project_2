import {
  generateOtp,
  verifyOtp,
  sendOtpEmail,
} from "../Models/emailAuthModel.js";

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });
  try {
    const otp = await generateOtp(email);
    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });
  try {
    const valid = await verifyOtp(email, otp);
    if (valid) {
      res.json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
