import express from "express";
const router = express.Router();

// import { DocUpload } from "../Controllers/docUploadController.js";
import { docScopeValidation } from "../Controllers/docScopeValidationController.js";
import { entityMetadataExtraction } from "../Controllers/entityMetadataExtractionController.js";
import { docClassification } from "../Controllers/docClassificationController.js";
import { docSummarization } from "../Controllers/docSummarizationController.js";
import { docSearch } from "../Controllers/docSearchController.js";
import { ragQueryInput } from "../Controllers/ragQueryInputController.js";
import { visionRagIngestInput } from "../Controllers/visionRagIngestInputController.js";
import { visionRagQueryInput } from "../Controllers/visionRagQueryInputController.js";
import { visionRagDeleteInput } from "../Controllers/visionRagDeleteInputController.js";

router.post("/document-scope-validation", docScopeValidation);
router.post("/entity-metadata-extraction", entityMetadataExtraction);
router.post("/classification", docClassification);
router.post("/summarization", docSummarization);
router.post("/search", docSearch);
router.post("/rag-query-input", ragQueryInput);

router.post("/vision-rag-ingest-input", visionRagIngestInput);
router.post("/vision-rag-query-input", visionRagQueryInput);
router.post("/vision-rag-delete-input", visionRagDeleteInput);
export default router;
