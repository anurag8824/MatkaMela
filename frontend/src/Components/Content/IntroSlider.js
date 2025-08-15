import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IntroSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We’ll use custom buttons
  };

  const images = [
    "/images/banner.jpg",
    "/images/banner2.png",
    "/images/banner.jpg",
    "/images/banner2.png",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 relative">
      {/* Custom Buttons */}
      <button
        className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <span className="text-xl font-bold">&larr;</span>
      </button>

      <button
        className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        onClick={() => sliderRef.current.slickNext()}
      >
        <span className="text-xl font-bold">&rarr;</span>
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[465px] object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default IntroSlider;
