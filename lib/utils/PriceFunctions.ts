import { PriceHistoryItemType } from "@/types/product";

export const getLowestPrice = (priceList: PriceHistoryItemType[]) => {
    let lowestPrice = priceList[0];

    for (let i = 0; i < priceList.length; i++) {
        if (priceList[i].price < lowestPrice.price) {
            lowestPrice = priceList[i];
        }
    }

    return lowestPrice.price;
};

export const getAveragePrice = (priceList: PriceHistoryItemType[]) => {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;

    return averagePrice;
};


export const getHighestPrice = (priceList: PriceHistoryItemType[]) => {
    let highestPrice = priceList[0];

    for (let i = 0; i < priceList.length; i++) {
        if (priceList[i].price > highestPrice.price) {
            highestPrice = priceList[i];
        }
    }

    return highestPrice.price;
};

export const getPriceDifference = (originalPrice: number, currentPrice: number) => {
    if (currentPrice === originalPrice) return "The price of this item has not changed 😐";
    if (currentPrice > originalPrice) return `The price is now ${currentPrice - originalPrice} more 😓`;
    return `You can save ${originalPrice - currentPrice} if you buy now 😀`;
};