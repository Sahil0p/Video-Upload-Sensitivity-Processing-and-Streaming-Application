// import { Router } from "express";
// import multer from "multer";
// import { uploadVideo, getVideos } from "../controllers/video.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";
// import { tenantMiddleware } from "../middleware/tenant.middleware.js";

// const router = Router();

// const upload = multer({ dest: "uploads/raw" });

// router.post(
//   "/upload",
//   authMiddleware,
//   tenantMiddleware,
//   upload.single("video"),
//   uploadVideo
// );

// router.get("/", authMiddleware, tenantMiddleware, getVideos);


// export default router;

import { Router } from "express";
import multer from "multer";

import {
  uploadVideo,
  getVideos,
  getFlaggedVideos,
  reviewVideo,
  getVideoStats,
} from "../controllers/video.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import { tenantMiddleware } from "../middleware/tenant.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = Router();
const upload = multer({ dest: "uploads/raw" });

router.post(
  "/upload",
  authMiddleware,
  tenantMiddleware,
  upload.single("video"),
  uploadVideo
);

router.get("/", authMiddleware, tenantMiddleware, getVideos);

router.get(
    "/stats",
    authMiddleware,
    tenantMiddleware,
    getVideoStats
  );

// 🔐 ADMIN ROUTES
router.get(
  "/admin/flagged",
  authMiddleware,
  tenantMiddleware,
  isAdmin,
  getFlaggedVideos
);

router.post(
  "/admin/review/:id",
  authMiddleware,
  tenantMiddleware,
  isAdmin,
  reviewVideo
);

export default router;
