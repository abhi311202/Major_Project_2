import { uploadDocPdfToS3 } from "../Models/uploadDocPdfToS3Model.js";
export const uploadDocS3PdfController = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No pdf file uploaded" });
  try {
    const { fileUrl, fileKey } = await uploadDocPdfToS3(file);
    res.status(200).json({
      message: "File uploaded successfully",
      pdf: fileUrl,
      filekey: fileKey,
      filename: file.originalname,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message });
  }
};
