import { isEmailAvailable } from "../Models/emailAvailabilityCheckModel.js";

export async function emailAvailabilityCheckController(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  try {
    const available = await isEmailAvailable(email);
    return res.status(200).json({ success: true, available });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}