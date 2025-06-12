import express from "express";
const router = express.Router();

import { registerAdmin } from "../Controllers/registerAdminController.js";
import { adminLogin } from "../Controllers/adminLoginController.js";
import { logout } from "../Controllers/logoutController.js";
import { applyForSuperAdmin } from "../Controllers/SupAdminReqController.js";
import { getAdminDetails } from "../Controllers/getAdminDetailsController.js";
import { changeAdminPersonalDetailController } from "../Controllers/changeAdminPersonalDetailController.js";
import { passwordChangeController } from "../Controllers/passwordChangeController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
router.post("/apply-super-admin", applyForSuperAdmin);
router.post("/get-admin-details", getAdminDetails);
router.post("/change-personal-detail", changeAdminPersonalDetailController);
router.post("/change-password", passwordChangeController);
// router.post("/verify", userMiddleware, demo);

export default router;
