// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "uploads/raw",
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 500 }, // 500MB
//   fileFilter(req, file, cb) {
//     const allowed = ["video/mp4", "video/mkv", "video/webm"];
//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error("Invalid video format"));
//     }
//     cb(null, true);
//   },
// });
import multer from "multer";
import path from "path";

const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 500);

const allowed = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/mkv"
];

const storage = multer.diskStorage({
  destination: "uploads/raw",
  filename: (_, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_UPLOAD_MB * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid video format"));
    }
    cb(null, true);
  }
});
