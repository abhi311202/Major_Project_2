import { changeUserEmail } from "../Models/changeEmailModel.js";

export const changeEmailController = async (req, res) => {
  const { id, currentEmail, newEmail } = req.body;
  if (!id || !currentEmail || !newEmail) {
    return res.status(400).json({
      success: false,
      error: "id, currentEmail, and newEmail are required",
    });
  }
  try {
    const updated = await changeUserEmail({ id, currentEmail, newEmail });
    res.status(200).json({ success: true, email: updated.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message || error });
  }
};
