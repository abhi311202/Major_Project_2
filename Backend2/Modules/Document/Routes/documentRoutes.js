import express from "express";
const router = express.Router();

import { DocUpload } from "../Controllers/docUploadController.js";

// router.post("/register", registerAdmin);
router.post("/Upload", DocUpload);

export default router;
