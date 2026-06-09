// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageSource = any;

export function getImageUrl(
  source: ImageSource | undefined,
  width = 800,
  height?: number
): string {
  void width;
  void height;

  if (!source) return "/images/hero/hero-tamil-bride-main.jpg";
  if (typeof source === "string") return source;
  if (typeof source.url === "string") return source.url;
  if (typeof source.src === "string") return source.src;

  return "/images/hero/hero-tamil-bride-main.jpg";
}
