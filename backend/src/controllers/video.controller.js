

import Video from "../models/Video.model.js";
import { startVideoProcessingJob } from "../jobs/videoWorker.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const video = await Video.create({
      title,
      category,
      filePath: req.file.path,
      size: req.file.size,
      format: req.file.mimetype,
      tenantId: req.user.tenantId,
      uploadedBy: req.user.id,
      status: "processing",
    });

    startVideoProcessingJob(video._id);

    res.status(201).json({ success: true, video });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/videos?page=1&limit=10
 */
// export const getVideos = async (req, res) => {
//   const page = Number(req.query.page || 1);
//   const limit = Number(req.query.limit || 10);
//   const skip = (page - 1) * limit;

//   const cacheKey = `videos:${req.user.tenantId}:${page}:${limit}`;
//   const cached = await cacheGet(cacheKey);
//   if (cached) return res.json(cached);

//   const [videos, total] = await Promise.all([
//     Video.find({ tenantId: req.user.tenantId })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit),
//     Video.countDocuments({ tenantId: req.user.tenantId }),
//   ]);

//   const response = {
//     videos,
//     page,
//     totalPages: Math.ceil(total / limit),
//     total,
//   };

//   await cacheSet(cacheKey, response);
//   res.json(response);
// };

export const getVideos = async (req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 5);
    const skip = (page - 1) * limit;
  
    const query = { tenantId: req.user.tenantId };
  
    if (req.query.status) query.status = req.query.status;
    if (req.query.category) query.category = req.query.category;
  
    const [videos, total] = await Promise.all([
      Video.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Video.countDocuments(query),
    ]);
  
    res.json({
      videos,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  };
  

/**
 * ADMIN — Get flagged videos
 */
export const getFlaggedVideos = async (req, res) => {
    const videos = await Video.find({
      classification: "flagged",
    }).sort({ createdAt: -1 });
  
    res.json({ videos });
  };
  
  /**
   * ADMIN — Approve or reject
   */
  export const reviewVideo = async (req, res) => {
    const { action } = req.body;
  
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Not found" });
  
    if (action === "approve") {
      video.status = "safe";
      video.classification = "safe";
    } else if (action === "reject") {
      video.status = "failed";
    }
  
    await video.save();
    res.json({ success: true, video });
  };
  


  export const getVideoStats = async (req, res) => {
    const tenantId = req.user.tenantId;
  
    const [total, safe, flagged, processing] = await Promise.all([
      Video.countDocuments({ tenantId }),
      Video.countDocuments({ tenantId, classification: "safe" }),
      Video.countDocuments({ tenantId, classification: "flagged" }),
      Video.countDocuments({ tenantId, status: "processing" }),
    ]);
  
    res.json({
      total,
      safe,
      flagged,
      processing,
    });
  };
  