import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function UploadHistory() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/api/videos").then((res) => {
      setVideos(res.data.videos);
    });
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">
        Upload History
      </h3>

      <div className="space-y-3">
        {videos.map((v) => (
          <Link
            key={v._id}
            to={`/video/${v._id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{v.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(v.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  v.status === "safe"
                    ? "bg-green-100 text-green-700"
                    : v.status === "flagged"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {v.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
