import express from "express";
const router = express.Router();

// import userMiddleware from "../Middlewares/user.mid.js";

// import {
//   adminRequest,
//   adminLogin,
//   logout,
//   Approve_Req,
//   Delete_Req,
//   Set_Threshold1,
//   Fetch_Threshold1,
//   sendEmailOTP,
// } from "../Controllers/superAdminController.js";

import { adminLogin } from "../Controllers/adminLoginController.js";
import { adminRequest } from "../Controllers/getAdminRequestController.js";
import { logout } from "../Controllers/logoutController.js";
import { Approve_Req } from "../Controllers/ApproveAdminReqController.js";
import { Delete_Req } from "../Controllers/DeleteAdminReqController.js";
import { Set_Threshold1 } from "../Controllers/Set_Threshold1Controller.js";
import { Fetch_Threshold1 } from "../Controllers/Fetch_Threshold1Controller.js";
import { getSuperAdminRequests } from "../Controllers/GetSupAdminReqController.js";
import { approveSuperAdminRequestController } from "../Controllers/ApproveSupAdminReqController.js";
import { deleteSuperAdminRequest } from "../Controllers/DeleteSupAdminReqController.js";
import { getSuperAdminDetails } from "../Controllers/getSuperAdminDetailsController.js";

router.post("/login", adminLogin);
router.get("/AdminRequest", adminRequest);
router.post("/logout", logout);
router.post("/ApproveReq", Approve_Req);
router.post("/DeleteReq", Delete_Req);
router.post("/set-threshhold1", Set_Threshold1);
router.get("/get-threshhold1", Fetch_Threshold1);
router.get("/super-admin-requests", getSuperAdminRequests);
router.post("/approve-super-admin-request", approveSuperAdminRequestController);
router.post("/delete-super-admin-request", deleteSuperAdminRequest);
router.post("/get-super-admin-details", getSuperAdminDetails);

//   router.post("/verify", userMiddleware, demo);

export default router;
