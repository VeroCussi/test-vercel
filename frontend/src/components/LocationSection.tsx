import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface LocationSectionProps {
  scrollToSection: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation('LocationSection');

  const cardsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const background = backgroundRef.current;
    
    if (!cards || !background) return;

    // Crea una animación de desplazamiento más lento
    gsap.to(cards, {
      y: () => {
        // Desplazamiento más lento 
        // Se puede ajustar el multiplicador para controlar la velocidad
        return window.innerHeight * 0.3; // Sube más lento
      },
      ease: "none", // Movimiento lineal
      scrollTrigger: {
        trigger: background,
        start: "top top", // Comienza cuando el elemento llega a la parte superior
        end: "+=100%", // Termina después de desplazar 100% de la altura de la ventana
        scrub: true, // Suaviza el movimiento con el scroll
      }
    });

    // Pin original para mantener en su lugar
    ScrollTrigger.create({
      trigger: cards,
      start: "top top",
      end: "+=100%",
      pin: false,
      pinSpacing: true,
    });

  }, []);

  return (
    <div ref={backgroundRef}>
  <section ref={cardsRef} className="w-full bg-[#ffffff] text-center py-20 px-6 rounded-t-[38px]">
    
    <div className="w-full max-w-[1440px] justify-center mx-auto">
      <h3 className="text-[#6F508D] text-[32px] md:text-[60px] font-semibold leading-[1.2]">
      {t('title')} <br />
        <span className="text-[#6F508D] whitespace-pre-line text-[26px] md:text-[60px]">
        {t('subtitle')} 
          <span className="sm:hidden block"></span> {t('text')}
        </span>
      </h3>

      {/* Versión escritorio: Imagen grande */}
      <div className="hidden md:flex justify-center items-center mt-8">
        <Image
          src="/map-ile-de-france.png"
          alt="Carte Ile-de-France"
          width={800}
          height={500}
          className="w-full max-w-[800px] h-auto"
        />
      </div>

      {/* 📱 Versión móvil/tablet: Títulos + Imagen pequeña */}
      <div className="block md:hidden flex flex-col items-center mt-8">
        {/* Títulos adicionales */}
        <h3 className="text-[#2CA2B4] text-[32px] sm:text-[40px] font-semibold">Rueil-Malmaison</h3>
        <p className="text-[#2CA2B4] text-[32px] sm:text-[40px]">92500</p>

        <h3 className="text-[#2CA2B4] text-[32px] sm:text-[40px] font-semibold mt-4">Roissy-en-Brie</h3>
        <p className="text-[#2CA2B4] text-[32px] sm:text-[40px]">77680</p>

        <h3 className="text-[#2CA2B4] text-[32px] sm:text-[40px] font-semibold mt-4">Ferrière en Brie</h3>
        <p className="text-[#2CA2B4] text-[32px] sm:text-[40px]">77164</p>

        {/* Imagen pequeña */}
        <Image
          src="/map-ile-de-france-small.png"
          alt="Carte Ile-de-France mobile"
          width={400}
          height={300}
          className="w-full max-w-[400px] h-auto mt-6"
        />
      </div>

      {/* Texto y botones */}
      <div className="flex justify-center max-w-[900px] m-auto mt-8">
        <p className="font-inter text-[14px] sm:text-[20px] md:text-[24px] lg:text-[30px] font-semibold text-[#6F508D]">
        {t('description')}
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <a 
          href="https://calendly.com/dianeyobson" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#2CA2B4] text-white py-2 sm:py-3 px-4 sm:px-8 rounded-full flex items-center text-[12px] sm:text-[18px] font-bold hover:bg-[#258A9C] transition"
        >
          {t('buttons.collective')}
        </a>

        <button 
          onClick={scrollToSection}
          className="bg-white text-[#6F508D] py-2 sm:py-3 px-4 sm:px-8 border-[2px] border-[#6F508D] rounded-full flex items-center text-[12px] sm:text-[18px] font-bold hover:bg-[#f3e8ff] transition"
        >
          {t('buttons.one_to_one')}
        </button>
      </div>
    </div>
  </section>
</div>

  );
};

export default LocationSection;