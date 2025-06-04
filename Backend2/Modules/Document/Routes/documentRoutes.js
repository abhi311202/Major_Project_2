import express from "express";
const router = express.Router();

import { DocUpload } from "../Controllers/docUploadController.js";
import { getDocumentController } from "../Controllers/getDocumentController.js";
import { getDocumentByIdController } from "../Controllers/getDocumentByIdController.js";
// router.post("/register", registerAdmin);
router.post("/Upload", DocUpload);
router.get("/get-documents", getDocumentController);
router.post("/get-document-by-id", getDocumentByIdController);

export default router;
