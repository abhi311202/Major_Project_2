import express from "express";
const router = express.Router();

import { DocUpload } from "../Controllers/docUploadController.js";
import { getDocumentController } from "../Controllers/getDocumentController.js";

// router.post("/register", registerAdmin);
router.post("/Upload", DocUpload);
router.get("/get-documents", getDocumentController);

export default router;
