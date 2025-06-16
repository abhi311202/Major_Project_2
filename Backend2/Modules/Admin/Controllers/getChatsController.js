import { getChatsFromDatabase } from "../Models/getChatsFromDatabaseModel.js";

export const getChats = async (req, res) => {
  try {
    const { admin_id } = req.body;
    if (!admin_id)
      return res
        .status(400)
        .json({ success: false, error: "Admin ID is required" });
    console.log("IN Controller" + admin_id);
    const chats = await getChatsFromDatabase(admin_id);
    console.log("Chats: " + chats);
    if (chats) {
      res.status(200).json({
        success: true, // Use a more descriptive property name for success
        chats: chats,
      });
    } else {
      res.status(404).json({
        success: false, // Use a more descriptive property name for success
        error: "No chats found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false, // Use a more descriptive property name for success
      error: error.message || error,
    });
  }
};
