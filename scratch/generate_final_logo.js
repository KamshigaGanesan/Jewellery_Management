import sharp from "sharp";
import fs from "fs";
import path from "path";

const sourceImage = "c:\\Users\\DELL\\Desktop\\logo 3.jpeg";
const outputDir = "public/images";

async function generateFinalLogo() {
  if (!fs.existsSync(sourceImage)) {
    throw new Error(`Source image not found: ${sourceImage}`);
  }

  // Crop the 180x180 area
  const cropBox = { left: 538, top: 510, width: 180, height: 180 };
  console.log(`Cropping logo from ${sourceImage} with box:`, cropBox);

  const croppedBuffer = await sharp(sourceImage)
    .extract(cropBox)
    .png()
    .toBuffer();

  const logoPngPath = path.join(outputDir, "logo.png");
  const logoBrandPngPath = path.join(outputDir, "logo-brand.png");

  // Write to logo.png
  await sharp(croppedBuffer).toFile(logoPngPath);
  console.log(`Saved final cropped logo to ${logoPngPath}`);

  // Write to logo-brand.png
  await sharp(croppedBuffer).toFile(logoBrandPngPath);
  console.log(`Saved final cropped logo to ${logoBrandPngPath}`);

  const meta = await sharp(logoPngPath).metadata();
  console.log(`Verified output size: ${meta.width}x${meta.height}`);
}

generateFinalLogo().catch(console.error);
