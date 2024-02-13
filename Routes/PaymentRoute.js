import express from "express";
import {
  initialPaymentAdminInitiatedDetails,
  onPaymentModeAccepted,
  paymentModeConfirm,
  paymnetNotReceived,
} from "../Controllers/PaymentController.js";
const router = express.Router();

router.get(
  "/payment-mode-admin-to-user/:id",
  initialPaymentAdminInitiatedDetails
);

router.put("/payment-mode-user-update/:id", onPaymentModeAccepted);

router.put("/payment-mode-user-update-two-mode/:id", paymnetNotReceived);

router.put("/payment-mode-user-confirm/:id", paymentModeConfirm);
export default router;
