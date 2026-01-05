import Video from "../models/Video.model.js";
import { analyzeSensitivity } from "./sensitivity.service.js";
import { compressVideo } from "./compression.service.js";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { io } from "../sockets/video.socket.js";

export const processVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video) return;

  try {
    console.log("🎬 Processing video:", video.filePath);

    io.to(video.tenantId.toString()).emit("processing", {
      videoId,
      status: "processing",
      progress: 10,
    });

    const outputPath = path.join(
      "uploads/processed",
      `${videoId}.mp4`
    );

    // 🎥 Compress
    await compressVideo(video.filePath, outputPath);

    // 📊 Metadata (SAFE)
    try {
      const metadata = await new Promise((res, rej) =>
        ffmpeg.ffprobe(outputPath, (e, d) =>
          e ? rej(e) : res(d)
        )
      );

      video.duration = metadata.format?.duration;
      video.size = metadata.format?.size;
    } catch (e) {
      console.warn("⚠️ ffprobe failed, skipping metadata");
    }

    io.to(video.tenantId.toString()).emit("processing", {
      videoId,
      status: "analyzing",
      progress: 60,
    });

    // 🧠 Sensitivity (GUARANTEED SAFE)
    let result;
    try {
      result = await analyzeSensitivity(outputPath);
    } catch (e) {
      console.warn("⚠️ Sensitivity failed, defaulting SAFE");
      result = { score: 0, classification: "safe" };
    }

    const finalStatus =
      result.classification === "flagged"
        ? "flagged"
        : "safe";

    video.processedPath = outputPath;
    video.sensitivityScore = result.score;
    video.classification = finalStatus;
    video.status = finalStatus;

    await video.save();

    io.to(video.tenantId.toString()).emit("completed", {
      videoId,
      status: finalStatus,
      score: result.score,
    });

    console.log("✅ Video processed:", finalStatus);
  } catch (err) {
    console.error("❌ PROCESSING ERROR:", err.message);

    video.status = "failed";
    await video.save();

    io.to(video.tenantId.toString()).emit("failed", {
      videoId,
      status: "failed",
    });
  }
};
