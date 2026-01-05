// import http from "http";
// import app from "./app.js";
// import { connectDB } from "./config/db.js";
// import { env } from "./config/env.js";
// import { initSocket } from "./sockets/video.socket.js";

// const server = http.createServer(app);

// // Initialize Socket
// initSocket(server);

// // Start DB then Server
// connectDB().then(() => {
//   server.listen(env.PORT, () => {
//     console.log(`🚀 Server running on port ${env.PORT}`);
//   });
// });

import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { initSocket } from "./sockets/video.socket.js";

const PORT = env.PORT || 5000;
const server = http.createServer(app);

/* =========================
   SOCKET.IO (LOCAL ONLY)
   ========================= */
if (env.NODE_ENV !== "production") {
  initSocket(server);
  console.log("🔌 Socket.io enabled (development)");
} else {
  console.log("🚫 Socket.io disabled (production)");
}

/* =========================
   START SERVER
   ========================= */
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });

/* =========================
   SAFETY LOGGING
   ========================= */
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});
