import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

export const useVideoStatus = (videoId) => {
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!videoId) return;

    const onProcessing = (data) => {
      if (data.videoId === videoId) {
        setStatus(data.status);
        setProgress(data.progress || 0);
      }
    };

    const onCompleted = (data) => {
      if (data.videoId === videoId) {
        setStatus(data.status);
        setProgress(100);
      }
    };

    const onFailed = (data) => {
      if (data.videoId === videoId) {
        setStatus("failed");
      }
    };

    socket.on("processing", onProcessing);
    socket.on("completed", onCompleted);
    socket.on("failed", onFailed);

    return () => {
      socket.off("processing", onProcessing);
      socket.off("completed", onCompleted);
      socket.off("failed", onFailed);
    };
  }, [videoId]);

  return { status, progress };
};
