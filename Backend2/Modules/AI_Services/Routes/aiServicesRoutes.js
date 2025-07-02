import express from "express";
const router = express.Router();

// import { DocUpload } from "../Controllers/docUploadController.js";
import { docScopeValidation } from "../Controllers/docScopeValidationController.js";
import { entityMetadataExtraction } from "../Controllers/entityMetadataExtractionController.js";
import { docClassification } from "../Controllers/docClassificationController.js";
import { docSummarization } from "../Controllers/docSummarizationController.js";
import { docSearch } from "../Controllers/docSearchController.js";
// router.post("/register", registerAdmin);
router.post("/document-scope-validation", docScopeValidation);
router.post("/entity-metadata-extraction", entityMetadataExtraction);
router.post("/classification", docClassification);
router.post("/summarization", docSummarization);
router.post("/search", docSearch);
export default router;
