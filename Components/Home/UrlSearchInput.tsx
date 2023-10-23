"use client";

import { FormEvent, useState } from "react";

import { AddProduct } from "@/lib/actions/products";

const UrlSearchInput = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("sdfdsf");

        try {
            setIsLoading(true);
            // Scrape the product page
            console.log({ searchPrompt });
            AddProduct(searchPrompt);
        } catch (error) {
            throw new Error("Unable to scrape this amazon product");
        } finally {
            setIsLoading(false);
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
                className="searchbar-btn"
                disabled={searchPrompt === ""}
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );
};

export default UrlSearchInput;