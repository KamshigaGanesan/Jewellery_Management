import fs from "fs";
import path from "path";

const browserDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser";

if (!fs.existsSync(browserDir)) {
  fs.mkdirSync(browserDir, { recursive: true });
}

function copyFile(src, dest) {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${src} -> ${dest}`);
    } else {
      console.log(`File not found: ${src}`);
    }
  } catch (e) {
    console.error(`Error copying ${src}: ${e.message}`);
  }
}

copyFile("c:\\Users\\DELL\\Desktop\\logo 3.jpeg", path.join(browserDir, "logo3.jpeg"));
copyFile("c:\\Users\\DELL\\Desktop\\2logo.jpeg", path.join(browserDir, "logo2.jpeg"));
copyFile("c:\\Users\\DELL\\Desktop\\logo.jpeg", path.join(browserDir, "logo_original.jpeg"));
