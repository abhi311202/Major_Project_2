import { sendWelcomeEmail } from "../Models/welcomeEmailModel.js";

export const welcomeEmailController = async (req, res) => {
  const { email, username, type } = req.body;
  if (!email || !username) {
    return res.status(400).json({ error: "Email and username are required" });
  }
  try {
    await sendWelcomeEmail(email, username, type);
    res.json({ message: "Welcome email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
