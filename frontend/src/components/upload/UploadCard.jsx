import { useState } from "react";
import api from "../../services/api";
import { useVideoStatus } from "../../hooks/useVideoStatus";
import { generateThumbnail } from "../../utils/videoThumbnail";
import PaginatedHistory from "../video/PaginatedHistory";

const MAX_MB = import.meta.env.VITE_MAX_UPLOAD_MB || 500;

export default function UploadCard() {
  const [activeTab, setActiveTab] = useState("upload");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [videoId, setVideoId] = useState(null);

  const { status, progress: processingProgress } =
    useVideoStatus(videoId);

  /* ---------------- FILE HANDLING ---------------- */

  const handleFile = (f) => {
    if (!f) return;

    if (f.size > MAX_MB * 1024 * 1024) {
      return alert(`File exceeds ${MAX_MB}MB limit`);
    }

    setFile(f);
    generateThumbnail(f, setThumbnail);
  };

  /* ---------------- UPLOAD ---------------- */

  const upload = async () => {
    if (!title || !file) return alert("Missing fields");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    fd.append("video", file);

    try {
      setUploading(true);
      setProgress(0);
      setSuccessMsg("");

      const res = await api.post("/api/videos/upload", fd, {
        onUploadProgress: (e) =>
          setProgress(
            Math.round((e.loaded * 100) / e.total)
          ),
      });

      setVideoId(res.data.video._id);

      setSuccessMsg("✅ Video uploaded successfully");
      setTimeout(() => setSuccessMsg(""), 3000);

      // Reset form
      setTitle("");
      setFile(null);
      setThumbnail(null);
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center">
      <div className="w-full max-w-xl">

        {/* ---------- TABS ---------- */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "upload"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Upload Video
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Upload History
          </button>
        </div>

        {/* ---------- UPLOAD TAB ---------- */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">
              🎥 Upload Video
            </h2>

            {/* SUCCESS MESSAGE */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm border border-green-200">
                {successMsg}
              </div>
            )}

            <input
              className="w-full border rounded-lg px-3 py-2 mb-3"
              placeholder="Video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="w-full border rounded-lg px-3 py-2 mb-3"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="general">General</option>
              <option value="education">Education</option>
              <option value="marketing">Marketing</option>
              <option value="personal">Personal</option>
            </select>

            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                handleFile(e.target.files[0])
              }
            />

            <p className="text-xs text-gray-500 mt-1">
              Max file size: {MAX_MB}MB
            </p>

            {/* THUMBNAIL */}
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Preview"
                className="mt-3 rounded-lg border"
              />
            )}

            {/* UPLOAD PROGRESS */}
            {uploading && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-600 rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs mt-1">
                  Uploading… {progress}%
                </p>
              </div>
            )}

            {/* PROCESSING STATUS */}
            {status && (
              <div className="mt-4 p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium">
                  Processing Status:{" "}
                  <span className="capitalize">
                    {status}
                  </span>
                </p>
                <div className="h-2 mt-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{
                      width: `${processingProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={upload}
              disabled={uploading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {/* ---------- HISTORY TAB ---------- */}
        {activeTab === "history" && (
          <PaginatedHistory />
        )}
      </div>
    </div>
  );
}
