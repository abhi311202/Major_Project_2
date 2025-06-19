// deleteS3DocPdfController
import { deleteDocPdfFromS3 } from "../Models/deleteDocPdfFromS3Model.js";

export const deleteS3DocPdfController = async (req, res) => {
  const { fileKey } = req.body;
  if (!fileKey) return res.status(400).json({ error: "fileKey is required" });
  if (fileKey === "key")
    return res
      .status(200)
      .json({ message: "File deleted successfully", fileKey });
  try {
    const result = await deleteDocPdfFromS3(fileKey);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
