"use server";

import { scrapeAmazonProduct } from "@/lib/scraper";

export const AddProduct = async (productUrl: string) => {
    if (!productUrl) return;

    try {
        const productData = await scrapeAmazonProduct(productUrl);

        console.log({ productData });
    } catch (error: any) {
        throw new Error(`Failed to process product ${productUrl}`, error.message);
    }
};