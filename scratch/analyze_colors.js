import sharp from "sharp";

async function analyzeColors(filepath) {
  const { data, info } = await sharp(filepath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let rSum = 0, gSum = 0, bSum = 0;
  const pixelCount = info.width * info.height;
  
  // Sample 1000 pixels
  const step = Math.max(1, Math.floor(pixelCount / 1000));
  let sampled = 0;
  let hasGreen = 0;
  let hasMaroon = 0;

  for (let i = 0; i < data.length; i += 3 * step) {
    if (i + 2 >= data.length) break;
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    rSum += r;
    gSum += g;
    bSum += b;
    sampled++;

    // Dark green: low red, higher green, low blue (e.g. R < 40, G > 40, B < 40)
    if (g > r * 1.5 && g > b * 1.5 && g > 20) {
      hasGreen++;
    }
    // Maroon: high red, low green, low blue (e.g. R > 80, G < 40, B < 50)
    if (r > g * 1.8 && r > b * 1.8 && r > 50) {
      hasMaroon++;
    }
  }

  console.log(`File: ${filepath}`);
  console.log(`Average Color: RGB(${Math.round(rSum/sampled)}, ${Math.round(gSum/sampled)}, ${Math.round(bSum/sampled)})`);
  console.log(`Green-ish pixels sampled: ${hasGreen}/${sampled}`);
  console.log(`Maroon-ish pixels sampled: ${hasMaroon}/${sampled}`);
}

async function run() {
  await analyzeColors("public/images/logo.png");
  await analyzeColors("public/images/logo-brand.png");
}

run().catch(console.error);
