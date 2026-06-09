import fs from "fs";
import path from "path";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
const workspaceRoot = "c:\\Users\\DELL\\Desktop\\IndiranJewellers2";

function findImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        results = results.concat(findImages(filePath));
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (allowedExtensions.includes(ext)) {
        results.push({
          path: filePath,
          size: stat.size,
        });
      }
    }
  });
  return results;
}

const images = findImages(workspaceRoot);
console.log(JSON.stringify(images, null, 2));
