import fs from "fs";

export const getFileStats = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  return fs.statSync(filePath);
};
