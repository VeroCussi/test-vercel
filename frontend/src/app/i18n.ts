'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHeader from '../locales/en/header.json';
import frHeader from '../locales/fr/header.json';
import enLandingPage from '../locales/en/landingPage.json';
import frLandingPage from '../locales/fr/landingPage.json';
import enTestimonialsCarousel from '../locales/en/testimonialsCarousel.json';
import frTestimonialsCarousel from '../locales/fr/testimonialsCarousel.json';
import enSlidingComponent from '../locales/en/slidingComponent.json';
import frSlidingComponent from '../locales/fr/slidingComponent.json';
import enProgramSelection from '../locales/en/programSelection.json';
import frProgramSelection from '../locales/fr/programSelection.json';
import enAboutVideo from '../locales/en/aboutVideo.json';
import frAboutVideo from '../locales/fr/aboutVideo.json';
import enTextEffect from '../locales/en/textEffect.json';
import frTextEffect from '../locales/fr/textEffect.json';
import enVideoSection from '../locales/en/videoSection.json';
import frVideoSection from '../locales/fr/videoSection.json';
import enMethod from '../locales/en/methodSection.json';
import frMethod from '../locales/fr/methodSection.json';
import enLocation from '../locales/en/locationSection.json';
import frLocation from '../locales/fr/locationSection.json';
import enFAQSection from '../locales/en/faqSection.json';
import frFAQSection from '../locales/fr/faqSection.json';
import enInstagramCarousel from '../locales/en/instagramCarousel.json';
import frInstagramCarousel from '../locales/fr/instagramCarousel.json';
import enFooter from '../locales/en/footer.json';
import frFooter from '../locales/fr/footer.json';
import enWaitlistModal from '../locales/en/waitlist.json';
import frWaitlistModal from '../locales/fr/waitlist.json';
import enStepModal from '../locales/en/stepModal.json';
import frStepModal from '../locales/fr/stepModal.json';
import enMentionsLegales from '../locales/en/mentionsLegales.json';
import frMentionsLegales from '../locales/fr/mentionsLegales.json';
import enCGV from '../locales/en/cgv.json';
import frCGV from '../locales/fr/cgv.json';


// Fichier central des traductions
const resources = {
  en: {
    Header: enHeader,
    LandingPage: enLandingPage,
    SlidingComponent: enSlidingComponent,
    ProgramSelection: enProgramSelection,
    AboutVideo: enAboutVideo,
    TextEffect: enTextEffect,
    faqSection: enFAQSection,
    videoSection: enVideoSection,
    MethodSection: enMethod,
    LocationSection: enLocation,
    instagramCarousel: enInstagramCarousel,
    testimonialsCarousel: enTestimonialsCarousel,
    footer: enFooter,
    waitlistModal: enWaitlistModal,
    stepModal: enStepModal,
    mentionsLegales: enMentionsLegales,
    cgv: enCGV
  },
  
  fr: {
    Header: frHeader,
    LandingPage: frLandingPage,
    SlidingComponent: frSlidingComponent,
    ProgramSelection: frProgramSelection,
    AboutVideo: frAboutVideo,
    TextEffect: frTextEffect,
    faqSection: frFAQSection,
    videoSection: frVideoSection,
    MethodSection: frMethod,
    LocationSection: frLocation,
    instagramCarousel: frInstagramCarousel,
    testimonialsCarousel: frTestimonialsCarousel,
    footer: frFooter,
    waitlistModal: frWaitlistModal,
    stepModal: frStepModal,
    mentionsLegales: frMentionsLegales,
    cgv: frCGV
  },
};

// Initialise i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr', // langue par défaut
    lng: 'fr',
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
