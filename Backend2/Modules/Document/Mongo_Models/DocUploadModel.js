import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  Doc_Title: { type: String, unique: true, required: true },
  Serial_No: { type: Number, unique: true, required: true },
  Classification: { type: String, required: true },
  Classification_reason: { type: String, required: true },
  Summary: { type: String, required: true },
  Document_Content: { type: String, required: true },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
