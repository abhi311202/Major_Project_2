import express from "express";
const router = express.Router();

import { processPayment } from "../Controllers/processPaymentController.js";
import { getKey } from "../Controllers/getKeyController.js";
import { paymentVerification } from "../Controllers/paymentVerificationController.js";

router.post("/process", processPayment);
router.get("/get-key", getKey);
router.post("/payment-verification", paymentVerification);
export default router;
