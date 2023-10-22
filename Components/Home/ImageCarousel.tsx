"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
    { imgUrl: "/assets/images/hero-1.jpg", alt: "smartwatch" },
    { imgUrl: "/assets/images/hero-2.jpg", alt: "bag" },
    { imgUrl: "/assets/images/hero-1.jpg", alt: "lamp" },
    { imgUrl: "/assets/images/hero-2.jpg", alt: "air fryer" },
    { imgUrl: "/assets/images/hero-1.jpg", alt: "chair" },
];


const ImageCarousel = () => {
    return (
        <div className="hero-carousel">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showArrows
                showStatus={false}
                interval={1000}
            >
                {heroImages.map((image) => (
                    <Image
                        src={image.imgUrl}
                        alt={image.alt}
                        width={484}
                        height={484}
                        className="object-contain"
                        key={image.alt}
                    />
                ))}
            </Carousel>

            <Image
                src="assets/icons/curved-arrow-right-up.svg"
                alt="arrow"
                width={175}
                height={175}
                className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
            />
        </div>
    );
};

export default ImageCarousel;