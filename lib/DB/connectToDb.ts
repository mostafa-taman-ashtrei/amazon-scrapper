import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    if (!process.env.MONGODB_URI) throw new Error("Mongo DB uri is undefined");

    mongoose.set("strictQuery", true);

    // eslint-disable-next-line no-console
    if (isConnected) return console.log("using existing database connection");

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;

        // eslint-disable-next-line no-console
        console.log("MongoDB Connected");
    } catch (error) {
        throw new Error("Could not connect to DB");
    }
};