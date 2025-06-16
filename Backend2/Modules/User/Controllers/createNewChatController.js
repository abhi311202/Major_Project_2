import { createNewChatInDatabase } from "../Models/createNewChatModel.js";
export const newChat = async (req, res) => {
  const { super_user_id, admin_id } = req.body;
  try {
    // check chat in DB

    // create new chat in DB
    const chat = await createNewChatInDatabase(super_user_id, admin_id);
    if (chat) {
      res.status(200).json({
        success: true,
        chat: chat,
      });
    }
  } catch (error) {}
};
