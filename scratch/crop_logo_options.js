import sharp from "sharp";
import path from "path";

const filepath = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser\\logo3.jpeg";
const destDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser";

async function cropOptions() {
  // Option 1: Slightly wider
  await sharp(filepath)
    .extract({ left: 535, top: 510, width: 185, height: 180 })
    .png()
    .toFile(path.join(destDir, "crop1.png"));
    
  // Option 2: Medium
  await sharp(filepath)
    .extract({ left: 540, top: 515, width: 175, height: 170 })
    .png()
    .toFile(path.join(destDir, "crop2.png"));

  // Option 3: Tighter
  await sharp(filepath)
    .extract({ left: 543, top: 518, width: 170, height: 170 })
    .png()
    .toFile(path.join(destDir, "crop3.png"));
    
  console.log("Three crop options saved to browser folder.");
}

cropOptions().catch(console.error);
