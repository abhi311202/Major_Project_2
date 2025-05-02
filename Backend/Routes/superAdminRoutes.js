import express from "express";
const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

import {
  adminRequest,
  adminLogin,
  logout,
  Approve_Req,
  Delete_Req,
  Set_Threshold1,
  Fetch_Threshold1,
} from "../Controllers/superAdminController.js";

//   router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.get("/AdminRequest", adminRequest);
router.post("/logout", logout);
router.post("/ApproveReq", Approve_Req);
router.post("/DeleteReq", Delete_Req);
router.post("/set-threshhold1", Set_Threshold1);
router.get("/get-threshhold1", Fetch_Threshold1);

//   router.post("/verify", userMiddleware, demo);

export default router;
