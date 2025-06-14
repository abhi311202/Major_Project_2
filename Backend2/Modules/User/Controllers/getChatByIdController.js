import { getChatByIdModel } from "../Models/getChatByIdModel.js";
import Messages from "../Mongo_Models/MsgUploadModel.js";

export const getChatById = async (req, res) => {
  try {
    const { ucid } = req.body;
    if (!ucid) {
      return res.status(400).json({ message: "UCID is required" });
    }
    const chat = await getChatByIdModel(ucid);
    if (chat.length === 0) {
      return res.status(404).json({ message: "Messages not found" });
    }
    // console.log(chat);
    const messagesWithDetails = await Promise.all(
      chat.map(async (msg) => {
        let mongoData = null;
        try {
          mongoData = await Messages.findById(
            msg.message_mongo_uid.toString()
          ).lean();
        } catch (mongoErr) {
          mongoData = {
            Message: "Unable to fetch Message.",
            Message_type: mongoErr.message,
          };
        }
        const { _id, ...rest } = mongoData;
        return { ...msg, ...rest };
      })
    );
    console.log(messagesWithDetails);
    res.status(200).json({
      success: true,
      note: "Messages fetched successfully",
      messages: messagesWithDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || error,
      note: "Internal server error",
    });
  }
};
