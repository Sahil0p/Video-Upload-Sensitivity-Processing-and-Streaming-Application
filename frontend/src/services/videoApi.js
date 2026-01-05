import api from "./api";

export const uploadVideo = (formData, onProgress) =>
  api.post("/api/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) =>
      onProgress(Math.round((e.loaded * 100) / e.total)),
  });

export const fetchVideos = (params = {}) =>
  api.get("/api/videos", { params });

export const streamUrl = (id) =>
  `${import.meta.env.VITE_API_URL}/api/stream/${id}`;
