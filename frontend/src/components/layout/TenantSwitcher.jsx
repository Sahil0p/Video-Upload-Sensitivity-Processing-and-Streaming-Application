import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function TenantSwitcher() {
  const { user, login } = useAuth();
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      api.get("/api/tenants").then(res => {
        setTenants(res.data.tenants);
      });
    }
  }, [user]);

  const switchTenant = async tenantId => {
    const { data } = await api.post("/api/auth/switch-tenant", {
      tenantId,
    });
    login(data); // refresh token + user context
  };

  if (user?.role !== "admin") return null;

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={user.tenantId}
      onChange={e => switchTenant(e.target.value)}
    >
      {tenants.map(t => (
        <option key={t._id} value={t._id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
