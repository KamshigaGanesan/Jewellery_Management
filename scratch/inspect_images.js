import sharp from "sharp";
import fs from "fs";
import path from "path";

const imageDir = "public/images";
fs.readdirSync(imageDir).forEach(async (file) => {
  const filePath = path.join(imageDir, file);
  if (fs.statSync(filePath).isFile()) {
    try {
      const meta = await sharp(filePath).metadata();
      console.log(`File: ${file}, Format: ${meta.format}, Size: ${meta.width}x${meta.height}, Channels: ${meta.channels}`);
    } catch (err) {
      console.log(`File: ${file}, Error: ${err.message}`);
    }
  }
});
