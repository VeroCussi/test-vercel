'use client';

import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

import ProgramSelection from '@/components/ProgramSelection';
import AboutVideo from '@/components/AboutVideo';
import VideoSection from '@/components/VideoSection';
import MethodSection from '@/components/MethodSection';
import LocationSection from '@/components/LocationSection';
import FAQSection from '@/components/FAQSection';
import InstagramFeed from '@/components/InstagramFeed';
import ExpandableVideo from '@/components/ExpandableVideo';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import SlidingComponent from '@/components/SlidingComponent';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import i18n from '../i18n';


export default function Home() {
  const { t } = useTranslation('LandingPage');
  const { lang } = useParams();
  const language = Array.isArray(lang) ? lang[0] : lang;

  // Función para desplazar el scroll a otra sección
  const programSelectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    programSelectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  // Para desplazar el contenido superior (logo, títulos, etc.) hacia arriba al hacer scroll.
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 300], [0, -150]); 


// Reference for the animated H2
  const h2Ref = useRef<HTMLDivElement>(null); // Reference for the animated H2

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }

    const h2Element = h2Ref.current;
    if (!h2Element) return;

    const words = Array.from(h2Element.querySelectorAll<HTMLElement>('.word'));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight* 0.8;// Bottom of the viewport
      const elementTop = h2Element.offsetTop;

      // Progress starts when the top of the section enters the viewport
      const progress = Math.min(1, Math.max(0, (scrollPosition - elementTop) / (window.innerHeight * 0.5)));

      words.forEach((word, index) => {
        const delay = index * 0.1; // Slight delay per word
        const visibilityProgress = progress - delay;

        if (visibilityProgress > 0) {
          word.style.opacity = '1'; // Fully visible
          word.style.transform = 'translateY(0)'; // Return to normal position
          word.style.transition = 'opacity 0.2s ease, transform 0.2s ease'; // Smooth transition
          word.style.color = `rgb(111, 80, 141)`; // Final color
        } else {
          word.style.opacity = '0.5'; // Hidden
          word.style.transform = 'translateY(100%)'; // Move down when hidden
          word.style.transition = 'opacity 0.2s ease, transform 0.2s ease'; // Smooth transition
          word.style.color = `rgba(111, 80, 141, 0.5)`; // Semi-transparent
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [language]);
 

  return (
    <div className="min-h-screen flex flex-col">
        
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen w-full bg-[color:--primary] flex flex-col"
      >
        {/* Contenido del hero que se desplaza hacia arriba */}
        <motion.div style={{ y: heroContentY }} className="w-full flex flex-col items-center">
          <div className="py-6 pb-12">
            <Image src="/logo.png" alt="main_logo" width={280} height={280} />
          </div>
          <h1 className="text-white text-[45px] font-semibold text-center">
          {t('hero.title')}
          </h1>
          <h2 className="text-[#39BACD] text-[38px] font-semibold text-center pb-10">
          {t('hero.subtitle')}
          </h2>
          <p className="max-w-[530px] px-6 pb-10 text-center text-white text-[20px]">
          {t('hero.description')}{' '}
            <span className="text-[color:--sky] font-bold">{t('hero.description1')}</span> {t('hero.description2')}{' '}
            <span className="text-[color:--sky] font-bold">{t('hero.description3')}</span> {t('hero.description4')}{' '}
            <span className="text-[color:--sky] font-bold">{t('hero.description5')}</span>
          </p>
          <div className="flex flex-row gap-4 m-2">
            <Link
              href="https://calendly.com/dianeyobson"
              target="_blank"
              className="flex items-center bg-[color:--sky] text-[13px] sm:text-[15px] text-white px-6 py-2 rounded-full"
            >
              {t('buttons.rdv')}
              <Image src="/calendar-clock.png" alt="Calendar" width={20} height={20} className="ml-2" />
            </Link>
            <button
              onClick={scrollToSection}
              className="flex items-center text-[13px] sm:text-[15px] text-white px-6 py-2 rounded-full border-2 border-white"
            >
              {t('buttons.programs')}
            </button>
          </div>
        </motion.div>

        {/* Video Section desktop */}
        <div className="w-full hidden lg:block" style={{ marginTop: '-150px' }}>
          <ExpandableVideo />
        </div>

      </section>

        
        {/* Video Section mobile */}
        <div className='bg-[color:--primary] block lg:hidden'>
          <ExpandableVideo />
        </div>
        {/* Testmonies Section */}
        <div className='bg-[color:--primary]'>
          <TestimonialsCarousel />
        </div>
        
        
        <section className='bg-[#ffffff] w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center py-8 mt-[110px] px-10'>
          <div className="w-full max-w-full">
          <h3 className="text-center text-[#72B7C3] text-[24px] sm:text-[40px] lg:text-[24px] font-semibold py-2 leading-[1.2] px-16">
            {t('programsSection.title')}
          </h3>

            
            <h2
              ref={h2Ref}
              className="text-center text-[32px] sm:text-[48px] md:text-[56px] lg:text-[45px] font-bold text-[color:--primary] pb-[30px] overflow-hidden px-6"
            >
              {/* Wrap each word in a span */}
              <span className="word text-[40px] sm:text-[60px] md:text-[45px]">
              {t('programsSection.yobson')}
            <span className="block lg:hidden leading-[0.1]"><br /></span>
            </span>{' '}

            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.specialiste')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.de')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.la')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.remise')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.en')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.forme')}</span>
            <br />
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.prenatal')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.et')}</span>{' '}
            <span className="word text-[30px] sm:text-[40px]">{t('programsSection.postnatal')}</span>{' '}   
            </h2>
          </div>
        </section>


    
        <SlidingComponent />
        <div ref={programSelectionRef} className='bg-[#ffffff]'>
          <ProgramSelection />
        </div>
        <AboutVideo scrollToSection={scrollToSection} />
        <VideoSection scrollToSection={scrollToSection} />
        <div className='bg-[#ffffff]'>
          <MethodSection />
        </div>
        <LocationSection scrollToSection={scrollToSection}/>
        <FAQSection />
        <InstagramFeed />
      
    </div>
  );
}
