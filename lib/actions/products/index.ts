"use server";

import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils/PriceFunctions";

import Product from "@/lib/models/Product";
import { connectToDb } from "@/lib/DB/connectToDb";
import { scrapeAmazonProduct } from "@/lib/scraper";

export const AddProduct = async (productUrl: string) => {
    if (!productUrl) return;

    try {
        connectToDb();
        const productData = await scrapeAmazonProduct(productUrl);

        if (!productData) return;
        let product = productData;

        const existingProduct = await Product.findOne({ url: productData.url });

        if (existingProduct) {
            const newPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: productData.currentPrice }
            ];

            product = {
                ...productData,
                priceHistory: newPriceHistory,
                lowestPrice: getLowestPrice(newPriceHistory),
                highestPrice: getHighestPrice(newPriceHistory),
                averagePrice: getAveragePrice(newPriceHistory),
            };
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: productData.url },
            product,
            { upsert: true, new: true }
        );

        console.log({ newProduct });
    } catch {
        throw new Error(`Failed to process product ${productUrl}`);
    }
};