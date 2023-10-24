import ImageCarousel from "@/Components/Home/ImageCarousel";
import ProductCard from "@/Components/Product/ProductCard";
import UrlSearchInput from "@/Components/Home/UrlSearchInput";
import { getAllProducts } from "@/lib/actions/products";

const Home: React.FC = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-20">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              Track products with
              <span className="text-primary"> Scrapping</span>
            </h1>

            <p className="paragraph-text">
              Keep track of all your favorite amazon products so you can get them at the best possible price.
            </p>
            <UrlSearchInput />
          </div>

          <ImageCarousel />
        </div>
      </section>

      <section className="latest-section">
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text"><span className="text-primary">Latest</span> Products</p>
          <hr />

          <div className="flex flex-wrap gap-10 mt-5 w-full">
            {allProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;