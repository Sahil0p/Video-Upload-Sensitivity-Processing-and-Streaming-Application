import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh_secret",
  UPLOAD_PATH: process.env.UPLOAD_PATH || "uploads",
  REDIS_URL: process.env.REDIS_URL || null,
  CDN_URL: process.env.CDN_URL || null,
};

if (!env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

if (!env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
  process.exit(1);
}
