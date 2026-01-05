import { Router } from "express";
import {
  createTenant,
  getTenants,
} from "../controllers/tenant.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post("/", authMiddleware, allowRoles("admin"), createTenant);
router.get("/", authMiddleware, allowRoles("admin"), getTenants);

export default router;
