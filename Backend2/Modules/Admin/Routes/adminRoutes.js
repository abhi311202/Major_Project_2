import express from "express";
const router = express.Router();

import { registerAdmin } from "../Controllers/registerAdminController.js";
import { adminLogin } from "../Controllers/adminLoginController.js";
import { logout } from "../Controllers/logoutController.js";
import { applyForSuperAdmin } from "../Controllers/SupAdminReqController.js";
import { getAdminDetails } from "../Controllers/getAdminDetailsController.js";
import { changeAdminPersonalDetailController } from "../Controllers/changeAdminPersonalDetailController.js";
import { passwordChangeController } from "../Controllers/passwordChangeController.js";
import { changePhoneController } from "../Controllers/changePhoneController.js";
import { changeEmailController } from "../Controllers/changeAdminEmailController.js";
import { getChats } from "../Controllers/getChatsController.js";
import { newMessage } from "../Controllers/sendNewMessageController.js";
import { getChatById } from "../Controllers/getChatByIdController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
router.post("/apply-super-admin", applyForSuperAdmin);
router.post("/super-admin-request-button-status", superAdminRequestButtonStatusController);
router.post("/get-admin-details", getAdminDetails);
router.post("/change-personal-detail", changeAdminPersonalDetailController);
router.post("/change-password", passwordChangeController);
router.post("/change-phone", changePhoneController);
router.post("/change-email", changeEmailController);
// router.post("/verify", userMiddleware, demo);

router.post("/get-chats", getChats);
router.post("/send-message", newMessage);
router.post("/get-msg-by-chat-id", getChatById);

export default router;
