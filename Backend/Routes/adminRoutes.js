import express from "express";
const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

import {
  registerAdmin,
  adminLogin,
  logout,
} from "../Controllers/adminController.js";

import { DocUpload } from "../Controllers/DocumentController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
router.post("/UploadDocument", DocUpload);

// router.post("/verify", userMiddleware, demo);

export default router;
