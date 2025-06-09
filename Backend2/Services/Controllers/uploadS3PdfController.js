import { uploadPdfToS3 } from "../Models/uploadPdfToS3Model.js";

export const uploadS3PdfController = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const { fileUrl, fileKey } = await uploadPdfToS3(file);
    console.log(fileUrl);
    console.log(fileKey);
    res.json({
      message: "File uploaded successfully",
      pdf: fileUrl,
      filekey: fileKey,
      filename: file.originalname,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
