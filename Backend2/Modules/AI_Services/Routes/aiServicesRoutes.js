import express from "express";
const router = express.Router();

// import { DocUpload } from "../Controllers/docUploadController.js";
import { docScopeValidation } from "../Controllers/docScopeValidationController.js";
import { entityMetadataExtraction } from "../Controllers/entityMetadataExtractionController.js";
// router.post("/register", registerAdmin);
router.post("/document-scope-validation", docScopeValidation);
router.post("/entity-metadata-extraction", entityMetadataExtraction);

export default router;
