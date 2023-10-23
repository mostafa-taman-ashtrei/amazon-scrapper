"use server";

import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils/PriceFunctions";

import Product from "@/lib/models/Product";
import { connectToDb } from "@/lib/DB/connectToDb";
import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "@/lib/scraper";

export const AddOrUpdateProduct = async (productUrl: string) => {
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

        revalidatePath(`/products/${newProduct._id}`);
    } catch {
        throw new Error(`Failed to process product ${productUrl}`);
    }
};

export const getProductById = async (productId: string) => {
    try {
        connectToDb();
        const product = await Product.findOne({ _id: productId });

        if (!product) return null;
        return product;
    } catch {
        throw new Error(`Failed to fetch product ${productId}`);
    }
};

export const getAllProducts = async () => {
    try {
        connectToDb();
        const products = await Product.find();

        return products;
    } catch {
        throw new Error("Failed to fetch all products");
    }
};

export const getSimilarPricedProducts = async (productId: string) => {
    try {
        connectToDb();

        const currentProduct = await Product.findById(productId);


        if (!currentProduct) return null;
        const similarProducts = await Product.find({ averagePrice: { $lte: currentProduct.averagePrice }, _id: { $ne: currentProduct._id } }).limit(3);

        return similarProducts;
    } catch {
        throw new Error("Failed to fetch similar products");
    }
};