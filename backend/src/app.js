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

// app.use(
//     cors({
//       origin: "http://localhost:5173",
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
//     "/api/stream",
//     helmet({
//       crossOriginResourcePolicy: false,
//     })
//   );
  
// // Static video access (optional)
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/stream", streamingRoutes);
// app.use("/api/tenants", tenantRoutes);

// // Health Route
// app.get("/health", (req, res) => {
//   res.json({ ok: true, service: "Video Platform Backend" });
// });

// // Not Found
// app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

// // Error Handler
// app.use(errorHandler);

// app.use("/api", adminRoutes);

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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(logger);
app.use(apiLimiter);

app.use(
  "/api/stream",
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Static video access
app.use("/uploads", express.static("uploads"));

// Routes ✅
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamingRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api", adminRoutes); // ✅ MOVE HERE

// Health Route
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "Video Platform Backend" });
});

// Not Found (ALWAYS LAST)
app.use((req, res) =>
  res.status(404).json({ message: "Route Not Found" })
);

// Error Handler (ALWAYS LAST)
app.use(errorHandler);

export default app;
