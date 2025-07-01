import express from "express";
const router = express.Router();

// import { DocUpload } from "../Controllers/docUploadController.js";
import { docScopeValidation } from "../Controllers/docScopeValidationController.js";

// router.post("/register", registerAdmin);
router.post("/document-scope-validation", docScopeValidation);

export default router;
