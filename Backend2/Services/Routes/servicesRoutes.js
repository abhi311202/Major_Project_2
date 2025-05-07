import express from "express";
import multer from "multer";
import { uploadS3PdfController } from "../Controllers/uploadS3PdfController.js";
import { deleteS3PdfController } from "../Controllers/deleteS3PdfController.js";
import {
  sendOtpController,
  verifyOtpController,
} from "../Controllers/emailAuthController.js";
import { welcomeEmailController } from "../Controllers/welcomeEmailController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

router.post("/upload-pdf", upload.single("file"), uploadS3PdfController);
router.delete("/delete-pdf", deleteS3PdfController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/send-welcome-email", welcomeEmailController);

export default router;
