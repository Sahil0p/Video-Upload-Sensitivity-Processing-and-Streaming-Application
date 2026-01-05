import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export function SocketProvider({ children, tenantId }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!tenantId) return;

    const s = io(import.meta.env.VITE_API_URL);
    s.emit("joinTenant", tenantId);
    setSocket(s);

    return () => s.disconnect();
  }, [tenantId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
