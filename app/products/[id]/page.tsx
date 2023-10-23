import { getProductById, getSimilarPricedProducts } from "@/lib/actions/products";

import Image from "next/image";
import Link from "next/link";
import PriceCard from "@/Components/Product/PriceCard";
import ProductCard from "@/Components/Product/ProductCard";
import { ProductType } from "@/types/product";
import TextModal from "@/Components/General/TextModal";
import { formatNumber } from "@/lib/utils/Numbers";
import { getPriceDifference } from "@/lib/utils/PriceFunctions";
import { redirect } from "next/navigation";

interface props {
    params: { id: string };
}

const ProductDetailsPage: React.FC<props> = async ({ params }) => {
    const product: ProductType | null = await getProductById(params.id);

    if (!product || product == null) redirect("/");

    const similarProducts = await getSimilarPricedProducts(params.id);

    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className="mx-auto"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <p className="text-[28px] text-secondary font-semibold">
                            {product.title}
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="product-btn">
                                <Link
                                    href={product.url}
                                    target="_blank"
                                    className="text-base text-black flex items-center justify-center gap-3"
                                >
                                    <Image
                                        src="/assets/icons/logo.svg"
                                        alt="buy now"
                                        width={20}
                                        height={20}
                                    />
                                    Buy now
                                </Link>
                            </div>

                            <div className="product-btn">
                                <Image
                                    src="/assets/icons/description.svg"
                                    alt={`${product.title} description`}
                                    width={20}
                                    height={20}
                                />

                                <TextModal
                                    title={product.title}
                                    bodytext={product.description}
                                    buttonText="Product Description"
                                    buttonStyle=""
                                />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10 hover:opacity-50 cursor-pointer">
                                <Image
                                    src="/assets/icons/share.svg"
                                    alt="share"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>
                        </div>


                        <div className="flex flex-row gap-4 align-top">
                            <p className="text-[21px] text-black opacity-50 line-through">
                                {product.currency} {formatNumber(product.originalPrice)}
                            </p>
                            <p>
                                {getPriceDifference(product.originalPrice, product.currentPrice)}
                            </p>
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                            <PriceCard
                                title="Current Price"
                                iconSrc="/assets/icons/price-tag.svg"
                                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                            />
                            <PriceCard
                                title="Average Price"
                                iconSrc="/assets/icons/average-chart.svg"
                                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                            />
                            <PriceCard
                                title="Highest Price"
                                iconSrc="/assets/icons/high-price-arrow.svg"
                                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                            />
                            <PriceCard
                                title="Lowest Price"
                                iconSrc="/assets/icons/low-price-arrow.svg"
                                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {similarProducts && similarProducts?.length > 0 && (
                <div className="py-14 flex flex-col gap-2 w-full">
                    <p className="section-text">Products With <span className="text-primary-green">Similar</span> Or <span className="text-primary">Lower</span> Prices</p>
                    <hr />

                    <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;