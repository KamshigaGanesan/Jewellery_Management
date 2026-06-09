import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/logo.png");
const output = path.join(root, "public/images/logo-brand.png");

const MAROON = { r: 107, g: 28, b: 42 };

async function trimPass(buffer) {
  return sharp(buffer).trim({ threshold: 40, lineArt: false }).toBuffer();
}

// Original photo: card rotated 90° clockwise → rotate back
let buf = await sharp(input).rotate(-90).toBuffer();
buf = await trimPass(buf);
buf = await trimPass(buf); // second pass removes remaining grey edges

await sharp(buf)
  .resize({ height: 96, fit: "inside", withoutEnlargement: false })
  .extend({
    top: 4,
    bottom: 4,
    left: 8,
    right: 8,
    background: MAROON,
  })
  .png()
  .toFile(output);

const meta = await sharp(output).metadata();
console.log("Saved", output, `${meta.width}x${meta.height}`);
