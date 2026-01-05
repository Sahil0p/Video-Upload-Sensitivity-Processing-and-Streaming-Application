import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket Connected:", socket.id);

    socket.on("joinTenant", (tenantId) => {
      socket.join(tenantId);
      console.log(`👥 Joined Tenant Room: ${tenantId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
    });
  });
};

export { io };
