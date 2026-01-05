// import fs from "fs";
// import Video from "../models/Video.model.js";

// export const streamVideo = async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     const filePath = video.processedPath || video.filePath;

//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "File missing" });
//     }

//     const stat = fs.statSync(filePath);
//     const fileSize = stat.size;
//     const range = req.headers.range;

//     if (!range) {
//       return res.status(416).send("Range header required");
//     }

//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + 10 ** 6, fileSize - 1);
//     const chunkSize = end - start + 1;

//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunkSize,
//       "Content-Type": "video/mp4",

//       // 🔥 REQUIRED FOR BROWSER
//       "Access-Control-Allow-Origin": "http://localhost:5173",
//       "Access-Control-Allow-Headers": "Range",
//       "Access-Control-Expose-Headers": "Content-Range, Accept-Ranges",
//       "Cross-Origin-Resource-Policy": "cross-origin",
//     };

//     res.writeHead(206, headers);
//     fs.createReadStream(filePath, { start, end }).pipe(res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Streaming error" });
//   }
// };


import fs from "fs";
import Video from "../models/Video.model.js";

export const streamVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Not found" });

  const filePath = video.processedPath || video.filePath;
  if (!fs.existsSync(filePath))
    return res.status(404).json({ message: "File missing" });

  const stat = fs.statSync(filePath);
  const range = req.headers.range;
  if (!range) return res.status(416).send("Range required");

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + 10 ** 6, stat.size - 1);

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${stat.size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4"
  });

  fs.createReadStream(filePath, { start, end }).pipe(res);
};
