import Tenant from "../models/Tenant.model.js";

export const createTenant = async (req, res) => {
  try {
    const { name, orgCode } = req.body;

    const exists = await Tenant.findOne({ orgCode });
    if (exists) return res.status(400).json({ message: "Tenant Exists" });

    const tenant = await Tenant.create({ name, orgCode });

    res.json({ success: true, tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTenants = async (req, res) => {
  const tenants = await Tenant.find();
  res.json({ success: true, tenants });
};
