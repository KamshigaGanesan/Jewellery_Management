import sharp from "sharp";

async function findGreenSquare() {
  const filepath = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser\\logo3.jpeg";
  
  const image = sharp(filepath);
  const metadata = await image.metadata();
  console.log(`Dimensions of logo3.jpeg: ${metadata.width}x${metadata.height}`);
  
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  // We want to find the dark green square.
  // Let's scan pixels and find the bounding box of pixels that look like dark green.
  // Dark green: R < 40, G > 35, B < 40 (approximately, let's see what the actual range is).
  // Let's print some sample pixel colors in the top-right quadrant to understand the green range.
  // Top right quadrant: x from width/2 to width, y from 0 to height/2.
  
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  let matches = 0;
  
  // Let's write a loop to sample pixels and print their colors.
  const startX = Math.floor(info.width * 0.5);
  const endX = info.width;
  const startY = 0;
  const endY = Math.floor(info.height * 0.5);
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Let's look for dark green color
      // In the logo, it's a dark forest green: R ~ 10-30, G ~ 40-70, B ~ 15-40
      // Let's use conditions: R < 50, G > 35, G > R * 1.5, G > B * 1.2, B < 60
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        matches++;
      }
    }
  }
  
  console.log(`Found ${matches} green-like pixels.`);
  if (matches > 0) {
    console.log(`Bounding Box: X min=${minX}, max=${maxX} (width=${maxX - minX})`);
    console.log(`Bounding Box: Y min=${minY}, max=${maxY} (height=${maxY - minY})`);
  }
}

findGreenSquare().catch(console.error);
