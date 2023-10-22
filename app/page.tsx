import ImageCarousel from "@/Components/Home/ImageCarousel";
import UrlSearchInput from "@/Components/Home/UrlSearchInput";

const Home: React.FC = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-20">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              Unleash the Power of
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

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          <p>Product 1</p>
          <p>Product 2</p>
          <p>Product 3</p>
        </div>
      </section>
    </>
  );
};

export default Home;