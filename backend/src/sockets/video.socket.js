
// import { Server } from "socket.io";
// import { env } from "../config/env.js";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin:
//         env.NODE_ENV === "production"
//           ? env.FRONTEND_URL
//           : ["http://localhost:5173"],
//       credentials: true,
//       methods: ["GET", "POST"],
//     },
//     transports: ["polling"], // ✅ safer for Render
//   });

//   io.on("connection", (socket) => {
//     console.log("🔌 Socket Connected:", socket.id);

//     socket.on("join-tenant", (tenantId) => {
//       socket.join(tenantId);
//       console.log("👥 Joined Tenant Room:", tenantId);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Socket Disconnected:", socket.id);
//     });
//   });
// };

// export { io };

// import { Server } from "socket.io";
// import { env } from "../config/env.js";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin:
//         env.NODE_ENV === "production"
//           ? env.FRONTEND_URL
//           : ["http://localhost:5173"],
//       credentials: true,
//     },
//     transports: ["polling"], // ✅ REQUIRED FOR RENDER
//   });

//   io.on("connection", (socket) => {
//     console.log("🔌 Socket Connected:", socket.id);

//     socket.on("join-tenant", (tenantId) => {
//       socket.join(tenantId);
//       console.log("👥 Joined Tenant Room:", tenantId);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Socket Disconnected:", socket.id);
//     });
//   });
// };

// export { io };

import { Server } from "socket.io";
import { env } from "../config/env.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);

        if (origin.startsWith("http://localhost")) {
          return cb(null, true);
        }

        if (origin.endsWith(".vercel.app")) {
          return cb(null, true);
        }

        if (origin === env.FRONTEND_URL) {
          return cb(null, true);
        }

        console.warn("🚫 Socket CORS blocked:", origin);
        return cb(null, false);
      },
      credentials: true,
    },
    transports: ["polling"], // ✅ REQUIRED FOR RENDER
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket Connected:", socket.id);

    socket.on("join-tenant", (tenantId) => {
      socket.join(tenantId);
      console.log("👥 Joined Tenant Room:", tenantId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected:", socket.id);
    });
  });
};

export { io };
