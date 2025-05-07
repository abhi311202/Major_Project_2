import { deletePdfFromS3 } from "../Models/deletePdfS3Model.js";

export const deleteS3PdfController = async (req, res) => {
  const { fileKey } = req.body;
  if (!fileKey) return res.status(400).json({ error: "fileKey is required" });
  try {
    const result = await deletePdfFromS3(fileKey);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};