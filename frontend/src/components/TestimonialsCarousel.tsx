"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const TestimonialsCarousel = () => {
  const { t } = useTranslation("testimonialsCarousel");
  const testimonials = (t("testimonials", { returnObjects: true }) as unknown as { text: string; link?: string; name: string; date?: string }[]) || [];



  return (
    <>
  <section className="relative w-full max-w-[1400px] m-auto pl-6 py-[100px] text-left text-white">
    <div className="flex flex-row justify-between pr-8 mb-6">
      <div className="pl-3">
      <h2 className="text-white text-[24px] md:text-[34px] font-semibold text-left">
      {t("title")}
      </h2>
      <p className="text-left font-semibold text-[#72B7C3]">
        <a href="https://g.co/kgs/TDHQquR" target="_blank" rel="noopener noreferrer">
        {t("see_all")}
        </a>
      </p>
      </div>
      <div className="flex gap-2">
        <button className="p-2 bg-white bg-opacity-20 rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10" id="prevButton">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <button className="p-2 bg-white bg-opacity-20 rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10" id="nextButton">
          <ArrowRight size={20} className="text-white" />
        </button>
      </div>
    </div>

    {/* Carrusel de testimonios */}
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={15}
      slidesPerView={1.2}
      navigation={{ nextEl: "#nextButton", prevEl: "#prevButton" }}
      breakpoints={{
        540: { slidesPerView: 1.4 },
        768: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
      }}
      grabCursor={false}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div 
            className="relative p-8 rounded-[20px] text-left max-w-[400px] h-[412px] mx-auto flex flex-col justify-between"
            style={{
              backgroundColor: index === 0 ? "#8E74A7" : "#7B5F96"
            }}
          >
            {/* Card content */}
            <div className="relative z-10">
              <span className="text-5xl text-white">“</span>
              <p className="font-inter text-[15px] text-semibold mt-1">{testimonial.text}</p>
              {testimonial.link && (
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-[16px] underline mt-2 inline-block hover:text-[#72B7C3] transition"
                    >
                      Lire la suite
                    </a>
                  )}
            </div>
            
            <div className="absolute bottom-4 right-4 flex flex-col items-end text-right gap-2 relative z-10">
              <p className="text-[16px] font-semibold">{testimonial.name}</p>
              {testimonial.date && (
                <p className="text-[12px] text-gray-300">{testimonial.date}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>

  {/* Imagen de la forma, fuera del section */}
  <div className="relative w-full">
    <Image 
      src="/shape.png" 
      alt="curve shape"
      fill
      className="w-screen absolute left-0 top-[-40px] sm:top-[-80px] md:top-[-80px] lg:top-[-123px] pb-[100px]"
    />
  </div>
</>

  );
};

export default TestimonialsCarousel;
