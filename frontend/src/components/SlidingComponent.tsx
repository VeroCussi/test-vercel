"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Image from "next/image";

const slidesData = [
  { id: 1, image: '/slide_bg1.png', color: '#7B5F96' },
  { id: 2, image: '/slide_bg2.png', color: '#6F508D' },
  { id: 3, image: '/slide_bg3.png', color: '#7B5F96' },
  { id: 4, image: '/slide_bg4.png', color: '#8E74A7' }
];

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const SlidingComponent = () => {
  const { t } = useTranslation('SlidingComponent');

  const [activeSlide, setActiveSlide] = useState(1);
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // ✅ Ahora se usa correctamente
      controls.start({ y: -window.scrollY * 0.2, opacity: 1 });
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, controls]);

  const slides = t('slides', { returnObjects: true }) as Array<{ title: string; content: string[] }>;

  if (!slides || slides.length === 0) return null;
  
  

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto mt-10">
        <motion.div layout className="hidden sm:block mb-4">
          <motion.h2
            key={activeSlide}
            className="text-lg sm:text-2xl font-semibold text-left text-[#6F508D] mb-4 flex flex-wrap items-start"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            style={{ minHeight: "4rem" }}
          >
            <span className="mr-4 w-xl h-xl text-[12px] font-semibold text-white bg-[#6F508D] px-4 py-1 rounded-md flex-shrink-0">
              {activeSlide}
            </span>
            <span className="flex-1">{slides[activeSlide - 1]?.title}</span>
          </motion.h2>
        </motion.div>

        <div className="hidden sm:flex flex-row w-full gap-2">
          {slidesData.map((slide) => (
            <motion.div
              key={slide.id}
              className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-1000 sm:h-[480px] h-[480px] ${
                activeSlide === slide.id ? "sm:w-[calc(100%-270px)]" : "sm:w-[90px]"
              }`}
              onClick={() => setActiveSlide(slide.id)}
              onMouseEnter={() => setActiveSlide(slide.id)}
              layout
              style={{ backgroundColor: slide.color }}
            >
              <div className="hidden sm:block h-full">
                {activeSlide === slide.id ? (
                  <div className="flex h-full">
                    <Image src={slide.image} alt={slides[slide.id - 1]?.title} width={500} height={300} style={{ width: "50%", height: "auto" }} className="object-cover" />
                    <motion.div
                      className="w-1/2 p-3 lg:p-10 text-white flex flex-col m-auto"
                      style={{ backgroundColor: slide.color }}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.8, duration: 1 }}
                    >
                      <ul className="m-auto gap-y-5 flex flex-col text-sm lg:text-base">
                      {slides?.[slide.id - 1]?.content?.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-4 h-4 rounded-full bg-white flex justify-center items-center mr-2 aspect-square flex-shrink-0 mt-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                  clipRule="evenodd"
                                  fill="#6F508D"
                                />
                              </svg>
                            </div>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-white text-lg font-semibold">
                    {slide.id}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="block sm:hidden relative">
        {slidesData.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col w-full px-6 mb-6"
          >
            <span className="hidden">{index}</span>
            <div className="overflow-hidden !rounded-t-[10px] !rounded-b-[0px] sm:!rounded-t-lg sm:!rounded-none">
              <Image src={slide.image} alt={slides[slide.id - 1]?.title} width={500} height={300} style={{ width: "100%", height: "auto" }} className="w-full h-auto" />
            </div>
            <div className="p-10 text-white rounded-b-[10px] -mt-2" style={{ backgroundColor: slide.color }}>
              <h2 className="text-[18px] font-semibold mb-8 leading-[1.3]">{slides[slide.id - 1]?.title}</h2>
              <ul className="space-y-4">
                {slides[slide.id - 1]?.content.map((item, idx) => (
                  <li key={`${slide.id}-${idx}`} className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-white flex justify-center items-center mr-3 aspect-square">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clipRule="evenodd"
                          fill="#6F508D"
                        />
                      </svg>
                    </div>
                    <span className="leading-snug text-[14px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SlidingComponent;
