import mongoose, { Model } from "mongoose";

import { ProductType } from "@/types/product";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
        {
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String, required: true } }], default: [],
}, { timestamps: true });

const Product: Model<ProductType> = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;