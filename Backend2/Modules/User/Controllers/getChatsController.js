import { getChatsFromDatabase } from "../Models/getChatsFromDatabaseModel.js";

export const getChats = async (req, res) => {
  try {
    const { super_user_id } = req.body;
    console.log("IN Controller" + super_user_id);
    const chats = await getChatsFromDatabase(super_user_id);
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
