import sharp from "sharp";

async function analyzeTopRight() {
  const filepath = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\58e9e681-7e01-45c4-9800-78384e2e4f74\\browser\\logo3.jpeg";
  const image = sharp(filepath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  console.log("Scanning row by row in X=350..738 to find green block...");
  
  let firstGreenRow = -1;
  let lastGreenRow = -1;
  
  for (let y = 350; y < 800; y++) {
    let greenCount = 0;
    for (let x = 350; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      
      // Green color check
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        greenCount++;
      }
    }
    
    if (greenCount > 50) { // Significant green pixels in this row
      if (firstGreenRow === -1) firstGreenRow = y;
      lastGreenRow = y;
    }
  }
  
  let firstGreenCol = -1;
  let lastGreenCol = -1;
  
  // Now scan columns in that row range
  for (let x = 350; x < info.width; x++) {
    let greenCount = 0;
    for (let y = firstGreenRow; y <= lastGreenRow; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        greenCount++;
      }
    }
    if (greenCount > 10) {
      if (firstGreenCol === -1) firstGreenCol = x;
      lastGreenCol = x;
    }
  }
  
  console.log(`Green square detection:`);
  console.log(`Y: ${firstGreenRow} to ${lastGreenRow} (height: ${lastGreenRow - firstGreenRow})`);
  console.log(`X: ${firstGreenCol} to ${lastGreenCol} (width: ${lastGreenCol - firstGreenCol})`);
  
  // The square logo is in the top-right. Let's see if the detected height matches the width.
  // In our first script, minY was 368 and maxY was 799 (because of the green background below).
  // The row range of the green square logo should be around Y: 512 to 712 (approx 200px height).
  // Let's print out green counts for each row in firstGreenRow to lastGreenRow to see where the gap is!
  console.log("Row-by-row green pixel count:");
  for (let y = firstGreenRow; y <= lastGreenRow; y++) {
    let greenCount = 0;
    for (let x = firstGreenCol; x <= lastGreenCol; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (r < 60 && g > 30 && g > r * 1.3 && g > b * 1.1 && b < 60) {
        greenCount++;
      }
    }
    console.log(`Row ${y}: ${greenCount}`);
  }
}

analyzeTopRight().catch(console.error);
