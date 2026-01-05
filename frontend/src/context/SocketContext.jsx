// import { createContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext(null);

// export function SocketProvider({ children, tenantId }) {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!tenantId) return;

//     const s = io(import.meta.env.VITE_API_URL);
//     s.emit("joinTenant", tenantId);
//     setSocket(s);

//     return () => s.disconnect();
//   }, [tenantId]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export function SocketProvider({ children, tenantId }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!tenantId) return;

    socketRef.current = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ["polling"], // ✅ Render safe
    });

    socketRef.current.emit("join-tenant", tenantId);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [tenantId]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
