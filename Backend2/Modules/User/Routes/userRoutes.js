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
import { passwordChangeController } from "../Controllers/passwordChangeController.js";
import { getProfileDataController } from "../Controllers/getProfileDataController.js";
import { changeEmailController } from "../Controllers/changeEmailController.js";
import { changePhoneController } from "../Controllers/changePhoneController.js";
import { changeUserPersonalDetailController } from "../Controllers/changeUserPersonalDetailController.js";
import { removeProfilePhotoController } from "../Controllers/removeProfilePhotoController.js";
import { changeProfilePhotoController } from "../Controllers/changeProfilePhotoController.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/change-password", passwordChangeController);
router.post("/get-profile-data", getProfileDataController);
router.post("/change-email", changeEmailController);
router.post("/change-phone", changePhoneController);
router.post("/change-personal-detail", changeUserPersonalDetailController);
router.post("/remove-profile-photo", removeProfilePhotoController);
router.post("/change-profile-photo", changeProfilePhotoController);

// router.post("/verify", userMiddleware, demo);

export default router;
