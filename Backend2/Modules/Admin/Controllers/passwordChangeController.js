import { changeAdminPassword } from "../Models/passwordChangeModel.js";

export const passwordChangeController = async (req, res) => {
  const { id, currentPassword, newPassword, confirmPassword } = req.body;
  if (!id || !currentPassword || !newPassword || !confirmPassword) {
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
    await changeAdminPassword({
      id,
      currentPassword,
      newPassword,
    });
    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || error });
  }
};
