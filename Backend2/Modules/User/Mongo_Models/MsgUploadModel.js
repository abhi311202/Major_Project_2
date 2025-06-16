import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  Message_type: { type: String, required: true },
  Message: { type: String, required: true },
});

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;
