// import { useState } from "react";
// import api from "../services/api";
// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Login({ embedded = false }) {
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState("");

//   const submit = async () => {
//     try {
//       const { data } = await api.post("/api/auth/login", {
//         email,
//         password,
//       });
//       login(data);
//       nav("/dashboard");
//     } catch {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   const Card = (
//     <motion.div className="auth-card glass border-gradient">
//       <h2 className="auth-title">Login</h2>

//       {error && (
//         <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
//       )}

//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />

//       <div className="relative mt-3">
//         <input
//           type={show ? "text" : "password"}
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//         />
//         <button
//           onClick={() => setShow(!show)}
//           className="absolute right-3 top-2 text-xs text-blue-400"
//         >
//           {show ? "Hide" : "Show"}
//         </button>
//       </div>

//       <button onClick={submit} className="btn-primary w-full mt-6">
//         Login
//       </button>
//     </motion.div>
//   );

//   if (embedded) return Card;
//   return <div className="auth-page">{Card}</div>;
// }


import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login({ embedded = false }) {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });

      login(data);
      nav("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Card = (
    <motion.div
      className="auth-card glass border-gradient"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="auth-title">Login</h2>

      {error && (
        <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
      )}

      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <div className="relative mt-3">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pr-16"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-sm text-blue-400 hover:text-blue-300
          "
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className={`btn-primary w-full mt-6 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </motion.div>
  );

  if (embedded) return Card;
  return <div className="auth-page">{Card}</div>;
}
