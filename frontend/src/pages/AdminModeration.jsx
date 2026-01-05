import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminModeration() {
  const [videos, setVideos] = useState([]);

  const load = () => {
    api.get("/api/videos/admin/flagged").then(res => {
      setVideos(res.data.videos);
    });
  };

  useEffect(load, []);

  const review = async (id, action) => {
    await api.post(`/api/videos/admin/review/${id}`, { action });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Flagged Videos
      </h1>

      <div className="grid gap-4">
        {videos.map(v => (
          <div
            key={v._id}
            className="bg-white rounded-lg shadow p-4"
          >
            <p className="font-medium">{v.title}</p>
            <video
              controls
              className="w-full mt-2 rounded"
              src={`${import.meta.env.VITE_API_URL}/api/stream/${v._id}`}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => review(v._id, "approve")}
                className="btn-success"
              >
                Approve
              </button>
              <button
                onClick={() => review(v._id, "reject")}
                className="btn-danger"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
