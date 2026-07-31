import { Router } from "express";

import {
  getRazorpayApiKey,
  createOrder,
  verifyPayment,
  allPayments,
} from "../controllers/payment.controller.js";

import {
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/razorpay-key").get(
  isLoggedIn,
  getRazorpayApiKey
);

router.route("/create-order/:courseId").post(
  isLoggedIn,
  createOrder
);

router.route("/verify").post(
  isLoggedIn,
  verifyPayment
);

router.route("/").get(
  isLoggedIn,
  authorizedRoles("ADMIN"),
  allPayments
);

export default router;