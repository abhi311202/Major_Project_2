import express from "express";
const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

import {
  registerUser,
  userLogin,
  logout,
  demo,
} from "../Controllers/userControllerSQL.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logout);
// router.post("/verify", userMiddleware, demo);

export default router;
