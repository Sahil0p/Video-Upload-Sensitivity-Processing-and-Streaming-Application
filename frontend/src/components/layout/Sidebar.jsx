import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "sidebar-link sidebar-link-active"
      : "sidebar-link";

  return (
    <aside className="sidebar">
      <motion.div
        className="sidebar-brand"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="sidebar-title">VideoSense 🎥</h2>
      </motion.div>

      <nav className="space-y-1 mt-6">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>

        {user?.role !== "viewer" && (
          <Link to="/upload" className={isActive("/upload")}>
            Upload Video
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className={isActive("/admin")}>
            Admin Panel
          </Link>
        )}
      </nav>
    </aside>
  );
}
