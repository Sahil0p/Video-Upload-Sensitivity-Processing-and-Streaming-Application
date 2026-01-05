// import jwt from "jsonwebtoken";
// import { env } from "../config/env.js";

// export const authMiddleware = (req, res, next) => {
//   const token =
//     req.headers.authorization?.split(" ")[1] || req.cookies?.token;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized - Token Missing",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       success: false,
//       message: "Invalid or Expired Token",
//     });
//   }
// };

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // 🔑 IMPORTANT
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
