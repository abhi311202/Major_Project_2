import { isUsernameAvailable } from "../Models/usernameAvailabilityCheckModel.js";

export async function usernameAvailabilityCheckController(req, res) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, message: "Username is required" });
  }
  try {
    const available = await isUsernameAvailable(username);
    return res.status(200).json({ success: true, available });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}