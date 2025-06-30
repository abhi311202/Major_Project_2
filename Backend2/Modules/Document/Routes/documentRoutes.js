import express from "express";
import multer from "multer";
const router = express.Router();

import { DocUpload } from "../Controllers/docUploadController.js";
import { getDocumentController } from "../Controllers/getDocumentController.js";
import { getDocumentByIdController } from "../Controllers/getDocumentByIdController.js";
import { getDocumentsByOwnerIdController } from "../Controllers/getDocumentByOwnerIdController.js";
import { deleteDocumentByIdController } from "../Controllers/deleteDocumentByIdController.js";
import { uploadDocS3PdfController } from "../Controllers/uploadDocS3PdfController.js";
import { deleteS3DocPdfController } from "../Controllers/deleteS3DocPdfController.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// router.post("/register", registerAdmin);
router.post("/Upload", DocUpload);
router.get("/get-documents", getDocumentController);
router.post("/get-document-by-id", getDocumentByIdController);
router.post("/get-document-by-owner-id", getDocumentsByOwnerIdController);
router.post("/delete-document-by-id", deleteDocumentByIdController);

// pdf-doc upload to S3
router.post("/upload-doc-pdf", upload.single("file"), uploadDocS3PdfController);
router.delete("/delete-doc-pdf", deleteS3DocPdfController);

export default router;
