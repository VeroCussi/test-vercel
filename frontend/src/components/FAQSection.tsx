import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";


// Plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


const FAQSection: React.FC = () => {
  const { t } = useTranslation("faqSection");

  const faqs = (t("faqs", { returnObjects: true }) as unknown as { question: string; answers: string[] }[]) || [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    console.log("Toggle FAQ:", index, "Current openIndex:", openIndex);
    setOpenIndex(openIndex === index ? null : index);
  };

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animación para que suba al hacer scroll.
    gsap.fromTo(
      section,
      { y: 100, opacity: 1 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
          //markers: true, // Útil para debugging
        },
      }
    );

    
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20 w-full bg-[#6F508D] text-white py-20 px-6 rounded-t-[38px] rounded-b-[38px]">
      {/* max-width container */}
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Título */}
        <h3 className="text-[34px] sm:text-[54px] md:text-[60px] leading-[45px] md:leading-[74.76px] font-semibold text-center tracking-[0.83px]">
        {t("title")} <br />
          <span className="text-[#72B7C3]">{t("subtitle")}</span>
        </h3>

        {/* FAQs */}
        <div className="mt-6 divide-y divide-[#FFFFFF33]">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                className="flex items-start sm:items-center justify-between w-full text-left text-[18px] font-medium"
                onClick={() => toggleFAQ(index)}
              >
                {/* Numbers */}
                <span className="w-6 text-[14px] font-['Inter'] text-white opacity-30 self-start">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Questions */}
                <h4 className="flex-1 px-[20px] font-light text-[22px] sm:text-[26px] tracking-[0.75px]">{faq.question}</h4>

                {/* Icon */}
                <span className="text-lg self-start">{openIndex === index ? "−" : "→"}</span>
              </button>
             

              {openIndex === index && (faq.answers && faq.answers.length > 0) && (
                faq.answers.map((answer, i) => (
                  <p key={i} className="mt-2 pb-3 text-[18px] px-10 font-inter font-semibold text-white">{answer}</p>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
