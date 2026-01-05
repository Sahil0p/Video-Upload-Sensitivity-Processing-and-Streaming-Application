import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import TenantSwitcher from "./TenantSwitcher";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  return (
    <header
      className={`flex items-center justify-between px-6 h-16 border-b shadow-sm
      transition-colors duration-300
      ${
        dark
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* LEFT: Brand */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg
          font-bold text-white transition-colors
          ${dark ? "bg-blue-500" : "bg-blue-600"}`}
        >
          🎬
        </div>

        <h1 className="text-xl font-semibold tracking-tight">
          VideoSense
        </h1>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Tenant */}
        <TenantSwitcher />

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className={`w-9 h-9 flex items-center justify-center rounded-full
          border transition
          ${
            dark
              ? "border-gray-700 hover:bg-gray-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          title="Toggle theme"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        {/* User Info */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
          ${
            dark
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <span className="font-medium">
            {user?.email}
          </span>

          <span
            className={`text-xs px-2 py-0.5 rounded-full
            ${
              dark
                ? "bg-blue-700 text-blue-100"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user?.role}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-4 py-1.5 rounded-full bg-red-500 hover:bg-red-600
          text-white text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
