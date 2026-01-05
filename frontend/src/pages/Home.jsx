import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "../components/auth/AuthModal";
import HeroArt from "../components/hero/HeroArt";

export default function Home() {
  const [mode, setMode] = useState(null); // "login" | "register"

  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center text-center px-6
                    text-gray-900 dark:text-white">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold"
      >
        Intelligent Video Sensitivity Platform
      </motion.h1>

      <p className="mt-6 max-w-2xl text-gray-700 dark:text-gray-300">
        Upload, analyze, classify and stream videos securely with real-time
        updates and role-based access.
      </p>

      <div className="mt-10 flex gap-4">
        <button
          onClick={() => setMode("login")}
          className={`px-6 py-3 rounded-lg font-semibold transition
            ${mode === "login"
              ? "bg-blue-600 text-white"
              : "bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-blue-500 hover:text-white"
            }`}
        >
          Login
        </button>

        <button
          onClick={() => setMode("register")}
          className={`px-6 py-3 rounded-lg font-semibold transition
            ${mode === "register"
              ? "bg-blue-600 text-white"
              : "bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-blue-500 hover:text-white"
            }`}
        >
          Register
        </button>
      </div>

      {/* AUTH CARD */}
      <AuthModal mode={mode} onClose={() => setMode(null)} />

      <HeroArt />
    </div>
  );
}
