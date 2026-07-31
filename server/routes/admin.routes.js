import { Router } from "express";
import { getAdminDashboard } from "../controllers/admin.controller.js";
import { isLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  getAdminDashboard
);

export default router;