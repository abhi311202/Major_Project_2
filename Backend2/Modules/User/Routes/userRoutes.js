import express from "express";
const router = express.Router();

// import userMiddleware from "../Middlewares/user.mid.js";

// import {
//   registerUser,
//   userLogin,
//   logout,
//   demo,
// } from "../Controllers/userControllerSQL.js";

import { registerUser } from "../Controllers/registerUser.js";
import { userLogin } from "../Controllers/userLogin.js";
import { logout } from "../Controllers/logout.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logout);
// router.post("/verify", userMiddleware, demo);

export default router;
