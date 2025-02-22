"use client";

import React from "react";
import { useTranslation } from "react-i18next";
//import Image from "next/image";

interface VideoSectionProps {
  scrollToSection: () => void;
}
  const VideoSection: React.FC<VideoSectionProps> = ({ scrollToSection }) => {
    const { t } = useTranslation("videoSection");

  return (
    <section className="bg-[#F9F8F8] relative z-30 pt-14 pb-20 px-8 md:px-24 lg:px-32 flex flex-col items-center text-center">
      {/* Título */}
      <div className="absolute top-[-30px] left-0 w-full h-[50px] bg-[#F9F8F8] rounded-t-[38px]"></div>

      <h2 className="text-[#6F508D] text-[34px] sm:text-[45px] md:text-[60px] font-semibold leading-[45px] sm:leading-[50px] md:leading-[74.76px] font-semibold pb-10">
        {t('title')}
      </h2>

      {/* Contenedor de videos */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 mb-8 w-full items-center lg:items-start justify-center">
        <img
          src="/videoyt1.png"
          alt={t('video1_alt')}
          
          className="w-full max-w-[90%] lg:w-[450px] h-auto max-h-[400px] object-contain"
        />
        <img 
          src="/videoyt2.png"
          alt={t('video2_alt')}
          
          className="w-full max-w-[90%] lg:w-[450px] h-auto max-h-[400px] object-contain"
        />
      </div>
      

      {/* Botón */}
      <button className="md:mt-16 bg-[#2CA2B4] text-white py-3 px-6 md:px-12 rounded-[70px] text-[19px] font-semibold hover:bg-[#258A9C] transition"
      onClick={scrollToSection}
      >
        {t('button')} 
      </button>
    </section>
  );
};

export default VideoSection;