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

// /* =========================
//    CORS (LOCAL + PRODUCTION)
//    ========================= */

  
// const allowedOrigins = [
//     "http://localhost:5173",
//     "http://127.0.0.1:5173",
//     process.env.FRONTEND_URL,
//   ].filter(Boolean);
  
//   app.use(
//     cors({
//       origin: (origin, cb) => {
//         // Allow server-to-server, Postman, curl
//         if (!origin) return cb(null, true);
  
//         // Development: allow all
//         if (process.env.NODE_ENV !== "production") {
//           return cb(null, true);
//         }
  
//         // Production: allow only known frontends
//         if (allowedOrigins.includes(origin)) {
//           return cb(null, true);
//         }
  
//         console.warn("🚫 CORS blocked:", origin);
//         return cb(null, false); // ❗ DO NOT throw error
//       },
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

  
// /* =========================
//    MIDDLEWARE
//    ========================= */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(helmet());
// app.use(compression());
// app.use(logger);
// app.use(apiLimiter);

// /* =========================
//    STREAMING HEADERS
//    ========================= */
// app.use(
//   "/api/stream",
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

// /* =========================
//    STATIC FILES (UPLOADS)
//    ========================= */
// app.use("/uploads", express.static("uploads"));

// app.use(
//     helmet({
//       crossOriginResourcePolicy: false,
//     })
//   );
  
// /* =========================
//    ROUTES
//    ========================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/stream", streamingRoutes);
// app.use("/api/tenants", tenantRoutes);
// app.use("/api", adminRoutes);

// /* =========================
//    HEALTH CHECK
//    ========================= */
// app.get("/health", (_, res) => {
//   res.json({ ok: true, service: "Video Platform Backend" });
// });

// /* =========================
//    NOT FOUND
//    ========================= */
// app.use((_, res) =>
//   res.status(404).json({ message: "Route Not Found" })
// );

// /* =========================
//    ERROR HANDLER
//    ========================= */
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
   CORS (DEV + PROD SAFE)
   ========================= */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (origin.startsWith("http://localhost")) {
        return cb(null, true);
      }

      if (origin.endsWith(".vercel.app")) {
        return cb(null, true);
      }

      if (origin === process.env.FRONTEND_URL) {
        return cb(null, true);
      }

      console.warn("🚫 CORS blocked:", origin);
      return cb(null, false); // ❗ never throw
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Helmet must allow cross-origin for streaming + sockets */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());
app.use(logger);
app.use(apiLimiter);

/* Static uploads */
app.use("/uploads", express.static("uploads"));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamingRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api", adminRoutes);

/* Health */
app.get("/health", (_, res) => {
  res.json({ ok: true, service: "Video Platform Backend" });
});

/* 404 */
app.use((_, res) =>
  res.status(404).json({ message: "Route Not Found" })
);

/* Error handler */
app.use(errorHandler);

export default app;
