

import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [flaggedVideos, setFlaggedVideos] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  /* ---------------- USERS ---------------- */

  const loadUsers = async () => {
    setLoadingUsers(true);
    const res = await api.get("/api/tenants/users");
    setUsers(res.data.users || []);
    setLoadingUsers(false);
  };

  const changeRole = async (userId, role) => {
    await api.put("/api/tenants/users/role", {
      userId,
      role,
    });
    loadUsers();
  };

  /* ---------------- FLAGGED VIDEOS ---------------- */

  const loadFlaggedVideos = async () => {
    setLoadingVideos(true);
    const res = await api.get("/api/videos/admin/flagged");
    setFlaggedVideos(res.data.videos || []);
    setLoadingVideos(false);
  };

  const reviewVideo = async (videoId, action) => {
    await api.post(`/api/videos/admin/review/${videoId}`, {
      action,
    });
    loadFlaggedVideos();
  };

  useEffect(() => {
    loadUsers();
    loadFlaggedVideos();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <PageContainer>
          <h1 className="dashboard-title mb-6">
            Admin Panel
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`btn-secondary ${
                activeTab === "users" ? "btn-active" : ""
              }`}
            >
              User Management
            </button>

            <button
              onClick={() => setActiveTab("moderation")}
              className={`btn-secondary ${
                activeTab === "moderation" ? "btn-active" : ""
              }`}
            >
              Content Moderation
            </button>
          </div>

          {/* ---------------- USER MANAGEMENT ---------------- */}
          {activeTab === "users" && (
            <>
              {loadingUsers ? (
                <div className="card text-center py-12">
                  Loading users…
                </div>
              ) : (
                <div className="card overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-muted">
                        <th className="py-3">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((u) => (
                        <tr key={u._id} className="border-b">
                          <td className="py-3">{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className="badge">
                              {u.role}
                            </span>
                          </td>
                          <td>
                            {u.role !== "admin" && (
                              <select
                                value={u.role}
                                onChange={(e) =>
                                  changeRole(
                                    u._id,
                                    e.target.value
                                  )
                                }
                                className="select"
                              >
                                <option value="viewer">
                                  Viewer
                                </option>
                                <option value="editor">
                                  Editor
                                </option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ---------------- CONTENT MODERATION ---------------- */}
          {activeTab === "moderation" && (
            <>
              {loadingVideos ? (
                <div className="card text-center py-12">
                  Loading flagged videos…
                </div>
              ) : flaggedVideos.length === 0 ? (
                <div className="card text-center py-12">
                  🎉 No flagged videos
                </div>
              ) : (
                <div className="grid gap-6">
                  {flaggedVideos.map((v) => (
                    <div
                      key={v._id}
                      className="card"
                    >
                      <h3 className="font-medium mb-2">
                        {v.title}
                      </h3>

                      <video
                        controls
                        className="w-full rounded mb-4"
                        src={`${import.meta.env.VITE_API_URL}/api/stream/${v._id}`}
                      />

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            reviewVideo(v._id, "approve")
                          }
                          className="btn-success"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            reviewVideo(v._id, "reject")
                          }
                          className="btn-danger"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </PageContainer>
      </div>
    </div>
  );
}
