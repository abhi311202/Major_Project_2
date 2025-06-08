import { changeUserPassword } from "../Models/passwordChangeModel.js";

export const passwordChangeController = async (req, res) => {
  const { username, email, currentPassword, newPassword, confirmPassword } =
    req.body;
  if (
    (!username && !email) ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required. Insufficient Credentials.." });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "New password and confirm password do not match." });
  }
  try {
    await changeUserPassword({ username, email, currentPassword, newPassword });
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};
