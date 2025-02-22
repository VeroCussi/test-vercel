"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";


const InstagramCarousel = () => {
  const { t } = useTranslation("instagramCarousel");

  const instagramImages = [
    "/insta1.png", 
    "/insta2.png",
    "/insta3.png",
    "/insta4.png",
  ];

  return (
    <section className="relative w-full max-w-[1200px] m-auto py-[100px] text-left ">
      {/* Contenedor de título y navegación */}
      <div className="flex flex-row justify-between px-4 md:px-6">
        {/* Título */}
        <div className="flex flex-col flex-grow">
          <h5 className="text-[#6F508D] text-[24px] md:text-[40px] items-left font-semibold leading-[1.2]">
          {t("title")}
          </h5>
          <p className="text-[#6F508D] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] items-left mt-4">
            <a 
                href="https://www.instagram.com/diane_yobson/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
            >
                {t("username")}
            </a>
          </p>
        </div>

        {/* Flechas de navegación personalizadas */}
        <div className="flex gap-4">
          <button className="p-2 bg-[#6F508D] bg-opacity-20 rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10 swiper-button-prev-custom">
            <ArrowLeft size={20} className="text-[#6F508D]" />
          </button>
          <button className="p-2 bg-[#6F508D] bg-opacity-20 rounded-full flex items-center justify-center w-8 h-8 md:w-10 md:h-10 swiper-button-next-custom">
            <ArrowRight size={20} className="text-[#6F508D]" />
          </button>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="mt-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            300: { slidesPerView: 1.3 },
            500: { slidesPerView: 2.2 },
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {instagramImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-w-[300px] mx-4">
                <Image
                  src={src}
                  alt={`Instagram post ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};

export default InstagramCarousel;
