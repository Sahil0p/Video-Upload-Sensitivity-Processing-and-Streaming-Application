import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "ffprobe-static";

// ✅ REQUIRED ON WINDOWS
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);

export const compressVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .outputOptions([
        "-preset fast",
        "-movflags +faststart",
        "-vf scale=1280:-2",
      ])
      .on("end", () => resolve(outputPath))
      .on("error", (err) => {
        console.error("❌ FFmpeg error:", err.message);
        reject(err);
      })
      .save(outputPath);
  });
};
