import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { initSocket } from "./sockets/video.socket.js";

const server = http.createServer(app);

// Initialize Socket
initSocket(server);

// Start DB then Server
connectDB().then(() => {
  server.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
});
