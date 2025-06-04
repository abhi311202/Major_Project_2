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
  sendEmailOTP,
} from "../Controllers/superAdminController.js";

//   router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.get("/AdminRequest", adminRequest);
router.post("/logout", logout);
router.post("/ApproveReq", Approve_Req);
router.post("/DeleteReq", Delete_Req);
router.post("/set-threshhold1", Set_Threshold1);
router.get("/get-threshhold1", Fetch_Threshold1);

router.post("/send-email-otp", async (req, res) => {
  console.log(req.body);
  try {
    await sendEmailOTP(req.body.email);
    res.json({ message: "Verification Mail Sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//   router.post("/verify", userMiddleware, demo);

export default router;
