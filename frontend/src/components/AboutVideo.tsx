import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextEffect from "./TextEffect";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface AboutVideoProps {
  scrollToSection: () => void;
}

const AboutVideo: React.FC<AboutVideoProps> = ({ scrollToSection }) => {
  const { t } = useTranslation('AboutVideo');
  // Usamos dos refs:
  // backgroundRef: se asigna al contenedor principal y sirve de trigger para el ScrollTrigger.
  // cardsRef: se asigna al contenedor interno que se animará (y se pinneará).
  const backgroundRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
  if (isMobile) return;

    const background = backgroundRef.current;
    const cards = cardsRef.current;
    if (!background || !cards) return;

    // Creamos un timeline que abarque las 3 fases
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: background,
        start: "bottom bottom",   
        end: "+=100%",            // Duración total de la animación (ajusta este valor según la longitud deseada)
        scrub: true,              // Sincroniza la animación con el scroll.
        // pin: cards,               // Se “pinea” el contenido a animar durante todo el efecto.
        // pinSpacing: false,
        // markers: true,         // Activa para ver visualmente los puntos de inicio y fin durante el desarrollo.
      },
    });

    // Fase 1: Animación de entrada (desde y: 100 hasta y: 0)
    tl.fromTo(
      cards,
      { y: 100, opacity: 1 },
      { y: 0, opacity: 1, ease: "none", duration: 1 }
    )
      // Fase 2: Pausa (el tween no cambia nada, consumiendo parte del scroll)
      .to(cards, { y: 0, ease: "none", duration: 1 })
      
      return () => {
        tl.kill(); // Eliminar la animación al desmontar el componente
      };
  }, []);

  return (
    // Este contenedor es el trigger del ScrollTrigger.
    <section
      ref={backgroundRef}
      className="relative z-20 w-full bg-[#6F508D] text-white rounded-t-[38px] py-20 px-8 md:px-24 lg:px-32 flex flex-col items-center"
    >
      {/* Este contenedor se animará y se pinneará */}
      <div ref={cardsRef}>
        <h2 className="font-['Ovink'] text-[35px] sm:text-[56px] md:text-[60px] font-semibold leading-[45px] sm:leading-[50px] md:leading-[74.76px] pb-8 text-center max-w-[1000px]">
        {t('title1')}
          <span className="text-[#72B7C3]">{t('title2')}</span>{" "}
          <span className="text-white">{t('title3')}</span>
        </h2>
        <h2 className="font-['Ovink'] text-[35px] sm:text-[56px] md:text-[60px] font-semibold leading-[45px] sm:leading-[50px] md:leading-[74.76px] pb-8 text-center max-w-[1000px]">

      </h2>
        {/* Resto del contenido */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-between mt-12">
          {/* img Container */}
          <div className="max-w-[460px] sm:w-[300px] md:w-[350px] lg:w-[460px] relative lg:sticky top-0 bottom-[110px] lg:pb-24 mx-auto sm:mx-0">
            <div className="w-full h-[500px] sm:h-[400px] md:h-[600px] lg:h-[690px] rounded-[20px] overflow-hidden rotate-[-3.9deg] flex">
              <Image
                src="/diane-yobson-portrait.png"
                alt="Diane Yobson portrait"
                width={460} // Ajusta según tu diseño
                height={690}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Texto y botones */}
          <div className="flex-1 font-['Inter'] flex flex-col justify-between">
            <TextEffect />
            <div className="mt-auto flex flex-col pt-10 md:flex-row gap-4">
              <a
                href="https://calendly.com/dianeyobson"
                className="bg-[#2CA2B4] text-white px-6 py-3 rounded-full text-[15px] font-bold hover:bg-[#258A9C] transition inline-flex items-center justify-center"
              >
                {t('cta_links.text1')}
              </a>
              {/* ✅ Botón que hace scroll a ProgramSelection */}
              <button
                onClick={scrollToSection}
                className="flex items-center justify-center font-bold text-[13px] sm:text-[15px] text-white px-6 py-2 rounded-full border-2 border-white"
              >
                {t("cta_links.text2")}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
