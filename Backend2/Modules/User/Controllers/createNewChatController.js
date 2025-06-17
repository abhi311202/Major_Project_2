import {
  createNewChatInDatabase,
  checkChat,
} from "../Models/createNewChatModel.js";
export const newChat = async (req, res) => {
  const { super_user_id, admin_id } = req.body;
  try {
    // check chat in DB
    const chat1 = await checkChat(super_user_id, admin_id);
    if (chat1.success) {
      return res.status(200).json({
        success: true,
        chat: chat1.Chat,
      });
    }
    console.log("Chat: " + chat1);
    // create new chat in DB
    const chat = await createNewChatInDatabase(super_user_id, admin_id);
    if (chat) {
      const chat2 = await checkChat(super_user_id, admin_id);
      if (chat2.success) {
        return res.status(200).json({
          success: true,
          chat: chat1.Chat,
        });
      }

      // res.status(200).json({
      //   success: true,
      //   chat: chat,
      // });
    } else {
      return res.status(400).json({
        success: false,
        error: "Chat not created",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message || error,
    });
  }
};
