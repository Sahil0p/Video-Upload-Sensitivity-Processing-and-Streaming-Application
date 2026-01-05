// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import compression from "compression";
// import { logger } from "./config/logger.js";
// import { apiLimiter } from "./middleware/rateLimiter.middleware.js";
// import { errorHandler } from "./middleware/error.middleware.js";

// // Routes
// import authRoutes from "./routes/auth.routes.js";
// import videoRoutes from "./routes/video.routes.js";
// import streamingRoutes from "./routes/streaming.routes.js";
// import tenantRoutes from "./routes/tenant.routes.js";
// import adminRoutes from "./routes/admin.routes.js";

// const app = express();

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //   })
// // );

// app.use(
//     cors({
//       origin: [
//         "http://localhost:5173",
//         process.env.FRONTEND_URL
//       ],
//       credentials: true,
//     })
//   );
  

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(helmet());
// app.use(compression());
// app.use(logger);
// app.use(apiLimiter);

// app.use(
//   "/api/stream",
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

// // Static video access
// app.use("/uploads", express.static("uploads"));

// // Routes ✅
// app.use("/api/auth", authRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/stream", streamingRoutes);
// app.use("/api/tenants", tenantRoutes);
// app.use("/api", adminRoutes); // ✅ MOVE HERE

// // Health Route
// app.get("/health", (req, res) => {
//   res.json({ ok: true, service: "Video Platform Backend" });
// });

// // Not Found (ALWAYS LAST)
// app.use((req, res) =>
//   res.status(404).json({ message: "Route Not Found" })
// );

// // Error Handler (ALWAYS LAST)
// app.use(errorHandler);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import { logger } from "./config/logger.js";
import { apiLimiter } from "./middleware/rateLimiter.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import streamingRoutes from "./routes/streaming.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

/* =========================
   CORS (LOCAL + PRODUCTION)
   ========================= */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      const allowed = [
        "http://localhost:5173",
        process.env.FRONTEND_URL,
      ];

      if (allowed.includes(origin)) return cb(null, true);

      cb(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(logger);
app.use(apiLimiter);

/* =========================
   STREAMING HEADERS
   ========================= */
app.use(
  "/api/stream",
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* =========================
   STATIC FILES (UPLOADS)
   ========================= */
app.use("/uploads", express.static("uploads"));

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamingRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api", adminRoutes);

/* =========================
   HEALTH CHECK
   ========================= */
app.get("/health", (_, res) => {
  res.json({ ok: true, service: "Video Platform Backend" });
});

/* =========================
   NOT FOUND
   ========================= */
app.use((_, res) =>
  res.status(404).json({ message: "Route Not Found" })
);

/* =========================
   ERROR HANDLER
   ========================= */
app.use(errorHandler);

export default app;
