import { processVideo } from "../services/videoProcessor.service.js";

export const startVideoProcessingJob = async (videoId) => {
  console.log("🔥 Job started for video:", videoId);

  setTimeout(() => {
    processVideo(videoId);
  }, 1000);
};
