import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import Slider2Img from "../../assets/images/img4.jpg";

const HeroSection = () => {
  useEffect(() => {
    console.log("Swiper mounted");
  }, []);

  return (
    <section className="section-1">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${Slider2Img})` }}
          >
            {/* Overlay */}
            <div className="hero-overlay">
              <h1>Quality Products, Honest Prices</h1>
              <h2>Trusted gadgets delivered across Nepal</h2>

              <Link to="/shop" className="btn btn-primary hero-btn">
                Shop  Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
