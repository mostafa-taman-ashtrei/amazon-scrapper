"use server";

import Product from "@/lib/models/Product";
import { UserType } from "@/types/user";
import { generateEmailBody } from "@/lib/utils/Email";
import { sendEmail } from "../nodemailer";

export const addUserEmailToProductList = async (productId: string, userEmail: string) => {
    try {
        const product = await Product.findById(productId);

        if (typeof product === "undefined" || product === null || typeof product.users === "undefined") throw new Error(`Failed to fetch product with id ${productId}`);

        const existingUser = product.users.some((user: UserType) => user.email === userEmail);

        if (!existingUser) {
            product.users.push({ email: userEmail });
            await product.save();

            const emailContent = await generateEmailBody(product, "WELCOME");

            await sendEmail(emailContent, [userEmail]);
            return true;
        }

        return false;
    } catch {
        throw new Error(`Failed to add ${userEmail} to ${productId} list`);
    }
};