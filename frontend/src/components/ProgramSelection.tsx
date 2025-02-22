import React, { useRef, useState, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import StepModal from "./StepModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

// Plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Program {
  title: string;
  subtitle?: string;
  text: string;
  text1?: string;
  forfait?: string;
  formule?: string;
  prix?: string[];
  links?: string[];
  buttonText: string;
  isHighlighted?: boolean;
  defaultCheckedIndex?: number;
  isLargeText?: boolean;
  formType?: string;
  onClick?: (formType?: string) => void;
}


// ProgramSelection
const ProgramSelection: React.FC = () => {
  const { t } = useTranslation('ProgramSelection');
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string | null>(null); // Controla qué formulario abrir
  
  const translatedPrograms = (isChecked 
    ? t('programsB', { returnObjects: true }) 
    : t('programsA', { returnObjects: true })
  ) as Program[];
  const [currentPrograms, setCurrentPrograms] = useState<Program[]>(translatedPrograms);


  const handleOpenModal = (formType: string | null) => {
    if (isChecked && formType) {  // opens "programsB" modal
      setSelectedForm(formType);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null); // restart selected form
  };



  // Refs definition:
  // backgroundRef: general container (trigger)
  // outerRef: pinned container
  // innerRef: inner container animated (tween)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    const background = backgroundRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!background || !outer || !inner) return;

    // Tween: inner container animated
    gsap.to(inner, {
      y: window.innerHeight * 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: background,
        start: "bottom bottom",
        end: "+=80%",
        scrub: true,
      },
    });

    // ScrollTrigger para pinnear el contenedor externo
    ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "+=500", // Duración del pin
      pin: true,
      pinSpacing: false,
      // markers: true, // Descomenta para ver los marcadores de depuración
    });
  }, []);

  useEffect(() => {
    const programs = (isChecked
      ? t("programsB", { returnObjects: true })
      : t("programsA", { returnObjects: true })
    ) as Program[];
    setCurrentPrograms(programs);
  }, [isChecked, t]);


  return (
    <div ref={backgroundRef}>
    <section
      ref={outerRef}
      className="max-w-[1200px] bg-white mx-auto justify-center items-center py-20 px-6 md:px-10">

        {/* Contenedor interno animado */}
        <div ref={innerRef} className="animacion">
        <div className="max-w-[1200px] mx-auto">
          {/* Contenedor principal */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 pt-12 pb-8 mb-8">
            
            {/* Left title */}
            <h3 className={`text-[25px] sm:text-[40px] md:text-[35px] leading-[40px] font-['Ovink'] transition-all text-center min-w-[200px]
              ${isChecked ? "text-[#6F508D]" : "text-[#2CA2B4] underline underline-offset-4"} `}
            >
              {t('toggle_titles.left')}
            </h3>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 order-first md:order-none">
              <input type="checkbox" className="sr-only peer" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              <div
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors 
                ${isChecked ? "bg-[#6F508D]" : "bg-[#2CA2B4]"}`}
              >
                <div className={`w-5 h-5 flex items-center justify-center rounded-full bg-white transition-transform transform 
                  ${isChecked ? "translate-x-6" : "translate-x-0"}`}
                >
                  <svg className={`w-4 h-4 ${isChecked ? "text-[#6F508D]" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </label>

            {/* Right title */}
            <h3 className={`text-[25px] sm:text-[40px] md:text-[35px] lg:text-[32px] leading-[40px] font-['Ovink'] transition-all text-center min-w-[200px]
              ${isChecked ? "text-[#2CA2B4] underline underline-offset-4" : "text-[#6F508D]"} `}
            >
              {t('toggle_titles.right')}
            </h3>

          </div>
        </div>

        {/* Grid de ProgramCards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentPrograms.map((program: Program, index: number) => (
          <ProgramCard
          key={index}
          {...program}
          onClick={program.formType ? () => handleOpenModal(program.formType as string) : undefined}
        />
        ))}
        </div>

        {/* Renderiza el Modal solo si es necesario */}
        <StepModal isOpen={isModalOpen} onClose={handleCloseModal} selectedForm={selectedForm} />
        </div>
    </section>
    </div>
  );
};

export default ProgramSelection;
