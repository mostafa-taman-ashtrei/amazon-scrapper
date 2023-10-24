import { generateEmailBody, getEmailNotificationType } from "@/lib/utils/Email";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils/PriceFunctions";

import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDb } from "@/lib/DB/connectToDb";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { sendEmail } from "@/lib/actions/nodemailer";

export const maxDuration = 300; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = async () => {
    try {
        connectToDb();
        const products = await Product.find({});

        if (!products) throw new Error("No product fetched");

        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

                if (!scrapedProduct) return;

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice },
                ];

                const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                };

                const updatedProduct = await Product.findOneAndUpdate(
                    { url: product.url },
                    product
                );

                // Send tracking Emails to all users tracking the product.
                const emailNotifType = getEmailNotificationType(
                    scrapedProduct,
                    currentProduct
                );

                if (emailNotifType && typeof updatedProduct !== "undefined" && updatedProduct !== null && typeof updatedProduct.users !== "undefined" && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                        image: updatedProduct.image
                    };

                    const emailContent = await generateEmailBody(productInfo, emailNotifType);
                    const userEmails = updatedProduct.users.map((user: any) => user.email);

                    await sendEmail(emailContent, userEmails);
                }

                return updatedProduct;
            })
        );

        return NextResponse.json({ message: "Ok", data: updatedProducts });
    } catch (error: any) {
        throw new Error(`Failed to get all products: ${error.message}`);
    }
};