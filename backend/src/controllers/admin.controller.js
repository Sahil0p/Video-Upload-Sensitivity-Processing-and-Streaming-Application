// import User from "../models/User.model.js";

// export const getTenantUsers = async (req, res) => {
//   try {
//     const users = await User.find({
//       tenantId: req.user.tenantId, // 🔑 THIS IS THE KEY
//     }).select("-password");

//     res.json({
//       success: true,
//       users,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import User from "../models/User.model.js";

// GET all users in same tenant
export const getTenantUsers = async (req, res) => {
  try {
    const users = await User.find({
      tenantId: req.user.tenantId,
    }).select("-password");

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔄 UPDATE USER ROLE
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["viewer", "editor"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Prevent admin changing own role
    if (req.user.id === userId) {
      return res
        .status(400)
        .json({ message: "You cannot change your own role" });
    }

    const user = await User.findOne({
      _id: userId,
      tenantId: req.user.tenantId,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin role cannot be modified" });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: "User role updated",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
