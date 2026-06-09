import sharp from "sharp";

async function findExactLogoBox() {
  const filepath = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser\\logo3.jpeg";
  const image = sharp(filepath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  // We scan the row range 512 to 686 (where the logo is).
  const startY = 512;
  const endY = 686;
  
  let minX = info.width;
  let maxX = 0;
  
  for (let y = startY; y <= endY; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      
      // Green color check
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  
  console.log(`Logo X-range for Y[512..686]: X min=${minX}, max=${maxX} (width=${maxX - minX})`);
  
  // Let's do a series of crops around this area to see what is correct.
  // The green square logo is in the top right.
  // Let's write out crops with different parameters to the browser directory.
  // We'll write out:
  // 1. crop_detected_strict: left=minX, top=startY, width=width, height=height
  const strictW = maxX - minX;
  const strictH = endY - startY;
  
  // Let's print out green counts for each column in this Y range to see if there is any noise on the left.
  console.log("Column-by-column green pixel count in Y[512..686]:");
  for (let x = minX; x <= maxX; x += 10) {
    let greenCount = 0;
    for (let y = startY; y <= endY; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        greenCount++;
      }
    }
    console.log(`Col ${x}: ${greenCount}`);
  }
}

findExactLogoBox().catch(console.error);
