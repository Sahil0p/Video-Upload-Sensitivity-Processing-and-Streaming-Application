import { motion } from "framer-motion";

export default function FloatingCard({ title, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="floating-card"
    >
      <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3" />
      <p className="text-sm font-semibold">{title}</p>
      <span className="text-xs text-muted">Processing video…</span>
    </motion.div>
  );
}
