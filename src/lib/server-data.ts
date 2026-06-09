import { connectToDatabase } from "@/lib/db";
import { CategoryModel, GoldRateModel, ProductModel, ReviewModel } from "@/lib/models";
import {
  calculateEstimatedPrice,
  summarizeGoldRates,
  type GoldRateRecord,
  type ProductLike,
} from "@/lib/commerce";

export async function getHomeData() {
  try {
    await connectToDatabase();
    const [featured, trending, categories, latestRates] = await Promise.all([
      ProductModel.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(8).lean(),
      ProductModel.find({ isTrending: true }).sort({ createdAt: -1 }).limit(8).lean(),
      CategoryModel.find().sort({ name: 1 }).limit(9).lean(),
      GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(90).lean(),
    ]);

    const rateSummary = summarizeGoldRates(latestRates as GoldRateRecord[]);

    const withPrices = (items: ProductLike[]) =>
      items.map((product) => ({
        ...product,
        displayPrice: calculateEstimatedPrice(product, rateSummary),
      }));

    return {
      featured: withPrices(featured as ProductLike[]),
      trending: withPrices(trending as ProductLike[]),
      categories,
      latestRates: rateSummary,
    };
  } catch {
    return {
      featured: [],
      trending: [],
      categories: [],
      latestRates: summarizeGoldRates([]),
    };
  }
}

export async function getCollectionsData(query?: string, category?: string) {
  try {
    await connectToDatabase();
    const filter: Record<string, unknown> = {};
    if (query) filter.name = { $regex: query, $options: "i" };
    if (category) filter.category = category;

    const [products, categories] = await Promise.all([
      ProductModel.find(filter).populate("category", "name slug").sort({ createdAt: -1 }).lean(),
      CategoryModel.find().sort({ name: 1 }).lean(),
    ]);
    return { products, categories };
  } catch {
    return { products: [], categories: [] };
  }
}

export async function getProductDetail(slug: string) {
  try {
    await connectToDatabase();
    const product = await ProductModel.findOne({ slug }).populate("category", "name slug").lean();
    if (!product) return null;
    const categoryId =
      typeof product.category === "object" && product.category !== null
        ? product.category._id ?? product.category
        : product.category;
    const [related, reviews] = await Promise.all([
      ProductModel.find({ category: categoryId, slug: { $ne: slug } }).limit(4).lean(),
      ReviewModel.find({ product: product._id }).sort({ createdAt: -1 }).limit(8).lean(),
    ]);
    const rateRecords = await GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(90).lean();
    const latestRates = summarizeGoldRates(rateRecords as GoldRateRecord[]);

    return {
      product: {
        ...product,
        displayPrice: calculateEstimatedPrice(product as ProductLike, latestRates),
      },
      related: related.map((item) => ({
        ...item,
        displayPrice: calculateEstimatedPrice(item as ProductLike, latestRates),
      })),
      reviews,
      latestRates,
    };
  } catch {
    return null;
  }
}
