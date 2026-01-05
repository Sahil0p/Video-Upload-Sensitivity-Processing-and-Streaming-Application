import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import VideoDetails from "./pages/VideoDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminModeration from "./pages/AdminModeration";

import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
  },

  {
    path: "/video/:id",
    element: (
      <ProtectedRoute>
        <VideoDetails />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/moderation",
    element: (
      <AdminRoute>
        <AdminModeration />
      </AdminRoute>
    ),
  },
]);
