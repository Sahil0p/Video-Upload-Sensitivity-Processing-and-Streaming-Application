import { Router } from "express";
import { streamVideo } from "../controllers/streaming.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { tenantMiddleware } from "../middleware/tenant.middleware.js";

const router = Router();

// router.get("/:id", authMiddleware, tenantMiddleware, streamVideo);
router.get("/:id", streamVideo);


export default router;
