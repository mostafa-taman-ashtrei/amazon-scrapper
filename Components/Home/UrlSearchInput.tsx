"use client";

import { FormEvent, useState } from "react";

import { AddOrUpdateProduct } from "@/lib/actions/products";
import { isValidAmazonProductURL } from "@/lib/utils/Urls";
import toast from "react-hot-toast";

const UrlSearchInput = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);

        if (!isValidLink) return toast.error("Please enter a valid amazon url.", { duration: 1000 });

        try {
            setIsLoading(true);
            await AddOrUpdateProduct(searchPrompt);
        } catch {
            throw new Error("Unable to scrape this amazon product");
        } finally {
            setSearchPrompt("");
            setIsLoading(false);
            toast.success("Product scraped.");
        }
    };


    return (
        <form
            className="flex flex-wrap gap-4 mt-12"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter Amazon link"
                className="searchbar-input"
            />

            <button
                type="submit"
                className="submit-btn"
                disabled={searchPrompt === "" || isLoading}
            >
                {
                    isLoading
                        ? <p className="animate-bounce">Scraping ...</p>
                        : "Scrape"
                }

            </button>
        </form>
    );
};

export default UrlSearchInput;