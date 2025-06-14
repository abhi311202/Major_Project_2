import Messages from "../Mongo_Models/MsgUploadModel.js";
import client from "../../../config/sqlDB.js";
import { sendNewMessageModel } from "../Models/sendNewMessageModel.js";

export const newMessage = async (req, res) => {
  const { ucid, sender_id, reciever_id, message_type, message } = req.body;
  let uploadedMsg = null;
  console.log(req.body);
  try {
    if (!ucid || !sender_id || !reciever_id || !message_type || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // insert into mongodb
    uploadedMsg = new Messages({
      Message_type: message_type,
      Message: message,
    });
    await uploadedMsg.save();
    //  insert into messages table
    client.query("BEGIN");
    const UploadedSqlMsg = await sendNewMessageModel(
      ucid,
      sender_id,
      reciever_id,
      uploadedMsg._id.toString()
    );
    if (UploadedSqlMsg) {
      client.query("COMMIT");
      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        UploadedSqlMsg: UploadedSqlMsg,
      });
    } else {
      throw new Error("Message Insertion in Messages table failed");
    }
    // return success
  } catch (error) {
    if (uploadedMsg) {
      //   roll back logic of mongodb
      //   console.log(createdDocument._id);
      //   console.log(createdDocument._id.toString());
      const deleted = await Messages.findByIdAndDelete(
        uploadedMsg._id.toString()
      );
      console.log("Deleted" + deleted);
    }
    client.query("ROLLBACK");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Send Message",
    });
  }
};
