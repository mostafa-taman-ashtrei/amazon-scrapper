export const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if (hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon")) return true;
    } catch {
        return false;
    }
    return false;
};