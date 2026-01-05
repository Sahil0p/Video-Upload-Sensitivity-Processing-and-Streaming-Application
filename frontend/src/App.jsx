import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./hooks/useAuth";

function AppWrapper() {
  const { user } = useAuth();

  return (
    <SocketProvider tenantId={user?.tenantId}>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </ThemeProvider>
  );
}
