// import express from "express";
// import authMiddleware from "../middleware/auth.middleware.js";
// import { allowRoles } from "../middleware/role.middleware.js";
// import { getTenantUsers } from "../controllers/admin.controller.js";

// const router = express.Router();

// // 🔐 ADMIN ONLY – TENANT SAFE
// router.get(
//   "/tenants/users",
//   authMiddleware,
//   allowRoles("admin"),
//   getTenantUsers
// );

// export default router;


import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  getTenantUsers,
  updateUserRole,
} from "../controllers/admin.controller.js";

const router = express.Router();

// View users
router.get(
  "/tenants/users",
  authMiddleware,
  allowRoles("admin"),
  getTenantUsers
);

// Promote / Demote
router.put(
  "/tenants/users/role",
  authMiddleware,
  allowRoles("admin"),
  updateUserRole
);

export default router;
