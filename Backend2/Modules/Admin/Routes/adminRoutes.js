import express from "express";
const router = express.Router();

import { registerAdmin } from "../Controllers/registerAdminController.js";
import { adminLogin } from "../Controllers/adminLoginController.js";
import { logout } from "../Controllers/logoutController.js";
import { applyForSuperAdmin } from "../Controllers/SupAdminReqController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
router.post("/apply-super-admin", applyForSuperAdmin);
// router.post("/UploadDocument", DocUpload);

// router.post("/verify", userMiddleware, demo);

export default router;
