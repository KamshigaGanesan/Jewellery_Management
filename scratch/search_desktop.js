import fs from "fs";
import path from "path";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
const searchDir = "c:\\Users\\DELL\\Desktop";

function findImages(dir, depth = 1) {
  if (depth > 2) return []; // Only search desktop and its immediate subdirectories
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (file !== "IndiranJewellers2" && file !== "node_modules" && !file.startsWith(".")) {
          results = results.concat(findImages(filePath, depth + 1));
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (allowedExtensions.includes(ext)) {
          results.push({
            path: filePath,
            size: stat.size,
            mtime: stat.mtime,
          });
        }
      }
    });
  } catch (e) {
    // Ignore errors
  }
  return results;
}

const images = findImages(searchDir);
images.sort((a, b) => b.mtime - a.mtime); // Sort by newest
console.log(JSON.stringify(images.slice(0, 10), null, 2));
