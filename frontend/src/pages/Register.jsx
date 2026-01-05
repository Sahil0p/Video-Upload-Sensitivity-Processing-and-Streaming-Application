// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Register({ embedded = false }) {
//   const nav = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     tenant: "",
//     role: "viewer",
//   });

//   const submit = async () => {
//     await api.post("/api/auth/register", form);
//     nav("/login");
//   };

//   const Card = (
//     <motion.div className="auth-card glass border-gradient">
//       <h2 className="auth-title">Register</h2>

//       {["name", "email", "password", "tenant"].map((key) => (
//         <input
//           key={key}
//           type={key === "password" ? "password" : "text"}
//           placeholder={key}
//           className="mt-3"
//           onChange={(e) =>
//             setForm({ ...form, [key]: e.target.value })
//           }
//         />
//       ))}

//       <select
//         className="mt-3"
//         onChange={(e) =>
//           setForm({ ...form, role: e.target.value })
//         }
//       >
//         <option value="viewer">Viewer</option>
//         <option value="editor">Editor</option>
//       </select>

//       <button onClick={submit} className="btn-primary w-full mt-6">
//         Register
//       </button>
//     </motion.div>
//   );

//   if (embedded) return Card;
//   return <div className="auth-page">{Card}</div>;
// }


import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register({ embedded = false }) {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenant: "",
    role: "viewer",
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    await api.post("/api/auth/register", form);
    nav("/login");
  };

  const Card = (
    <motion.div className="auth-card glass border-gradient">
      <h2 className="auth-title">Register</h2>

      {/* Name & Email */}
      {["Name", "Email"].map((key) => (
        <input
          key={key}
          type="text"
          placeholder={key}
          className="mt-3"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      {/* Password with Show/Hide */}
      <div className="relative mt-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pr-16"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-sm text-blue-500 hover:text-blue-400
          "
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Tenant */}
      <input
        type="text"
        placeholder="Tenant"
        className="mt-3"
        onChange={(e) =>
          setForm({ ...form, tenant: e.target.value })
        }
      />

      {/* Role */}
      <select
        className="mt-3"
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
      </select>

      <button onClick={submit} className="btn-primary w-full mt-6">
        Register
      </button>
    </motion.div>
  );

  if (embedded) return Card;
  return <div className="auth-page">{Card}</div>;
}
