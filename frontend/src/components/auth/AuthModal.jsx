import { motion, AnimatePresence } from "framer-motion";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export default function AuthModal({ mode, onClose }) {
  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
          className="
            mt-12 w-full max-w-md rounded-2xl
            bg-white/90 dark:bg-slate-900/90
            backdrop-blur-xl shadow-2xl
            border border-black/5 dark:border-white/10
            p-6
          "
        >
          {mode === "login" && <Login embedded />}
          {mode === "register" && <Register embedded />}

          <button
            onClick={onClose}
            className="
              mt-5 text-xs font-medium
              text-gray-500 dark:text-gray-400
              hover:text-blue-600 dark:hover:text-blue-400
              transition
            "
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
