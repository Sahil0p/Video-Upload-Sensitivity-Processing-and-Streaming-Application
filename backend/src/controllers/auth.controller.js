import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Tenant from "../models/Tenant.model.js";
import RefreshToken from "../models/RefreshToken.model.js";
import { env } from "../config/env.js";

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId,
    },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );

// ✅ REGISTER (RBAC SAFE)
export const register = async (req, res) => {
  try {
    const { name, email, password, tenant, role } = req.body;

    let tenantDoc = await Tenant.findOne({ orgCode: tenant });

    if (!tenantDoc) {
      tenantDoc = await Tenant.create({
        name: tenant,
        orgCode: tenant,
      });
    }

    const exists = await User.findOne({
      email,
      tenantId: tenantDoc._id,
    });

    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCount = await User.countDocuments({
      tenantId: tenantDoc._id,
    });

    let assignedRole = "viewer";

    // First user of tenant = admin
    if (userCount === 0) {
      assignedRole = "admin";
    } else if (role === "editor") {
      assignedRole = "editor";
    }

    await User.create({
      name,
      email,
      password,
      role: assignedRole,
      tenantId: tenantDoc._id,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("tenantId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user);

    const refreshToken = jwt.sign(
      { id: user._id },
      env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      success: true,
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
