'use client';

import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../app/i18n';
import Link from 'next/link';
import WaitlistModal from './WaitListModal';



const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('Header');

  // const [langDropdownVisible, setLangDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraer solo el nombre de la ruta sin el idioma
  const cleanPath = pathname.replace(/^\/(fr|en)(\/|$)/, '/');
  
  // Mostrar logo solo en estas páginas
  const showLogo = cleanPath === '/mentions-legales' || cleanPath === '/cgv';

  const currentLang = pathname.startsWith('/fr') ? 'fr' : 'en';

  // Switch language
  const switchLanguage = (newLang: string) => {
    router.push(`/${newLang}${cleanPath}`);
  };

  useEffect(() => {
    if (currentLang && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]);

  return (
    <header className="bg-[color:--primary] text-white p-10 flex flex-row justify-between items-center">
      
      {/* Redes Sociales */}
      <div className="flex flex-row gap-4">
        <Link href="https://www.facebook.com/CoachDiane06/" target="_blank" rel="noopener noreferrer">
          <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
        </Link>
        <Link href="https://www.instagram.com/diane_yobson/" target="_blank" rel="noopener noreferrer">
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
        </Link>
        <Link href="https://www.linkedin.com/in/CoachDianeYobson/" target="_blank" rel="noopener noreferrer">
          <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
        </Link>
      </div>

      {/* Logo only on theses pages */}
      {showLogo && (
        <Link href={`/${currentLang}`} className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/logo.png" alt="Logo" width={96} height={96} className="w-24 cursor-pointer" />
        </Link>
      )}

      {/* Navegación */}
      <div className="flex flex-row items-center gap-6">

        {/* Ícono de Llamada (M'appeler) - Oculto en móvil */}
        <Link href="tel:+0667295291" className="hidden lg:flex items-center gap-2 hover:text-gray-300">
          <Image src="/phone.png" alt="Call" width={20} height={20} />
          {t("M'appeler")}
        </Link>

        {/* Ícono de Espacio Miembro - Oculto en móvil */}
        <button onClick={() => setIsModalOpen(true)} className="hidden lg:flex items-center gap-2 hover:text-gray-300">
          <Image src="/user.png" alt="Member Space" width={20} height={20} />
        {t("Espace Membre")}
      </button>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Selector de idioma con banderas */}
      <div className="relative">
          <button 
            onClick={() => switchLanguage(currentLang === 'fr' ? 'en' : 'fr')} 
            className="flex items-center gap-2 hover:text-gray-300"
          >
            {currentLang === 'fr' ? (
              <Image src="/uk-flag.png" alt="Switch to English" width={24} height={24} />
            ) : (
              <Image src="/fr-flag.png" alt="Passer en Français" width={24} height={24} />
            )}
            <span>{currentLang === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </div>

        {/* toggle mobile */}
        <div className="relative lg:hidden">
          <button
            className="relative top-1 z-30"
            onClick={() => setMobileMenuVisible((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-10 h-10 text-[#11DEFF]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 100"
            >
              <line x1="15" y1="30" x2="105" y2="30" className="stroke-current" strokeWidth="8" strokeLinecap="round"
                style={{
                  transform: mobileMenuVisible ? 'rotate(45deg) translate(10px, 10px)' : 'rotate(0)',
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              <line x1="15" y1="50" x2="105" y2="50" className="stroke-current" strokeWidth="8" strokeLinecap="round"
                opacity={mobileMenuVisible ? 0 : 1}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              />
              <line x1="15" y1="70" x2="105" y2="70" className="stroke-current" strokeWidth="8" strokeLinecap="round"
                style={{
                  transform: mobileMenuVisible ? 'rotate(-45deg) translate(10px, -10px)' : 'rotate(0)',
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            </svg>
          </button>

          {/* Menú desplegable en móvil */}
          <div className={`absolute top-12 bg-white w-48 shadow-md rounded-md right-0 
            lg:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuVisible ? 'max-h-screen scale-y-100' : 'max-h-0 scale-y-0'
            }`}
            style={{ transformOrigin: 'top' }}
          >
            <nav>
              <ul className="flex flex-col space-y-2 p-4">
                <li>
                <Link href="tel:+123456789" className="flex items-center gap-2 text-gray-600">
                  <Image src="/phone.png" alt="Call" width={20} height={20} />
                  {t("M'appeler")}
                </Link>
                </li>
                <li>
                  {/* Evento onClick para abrir el modal en movil */}
                <button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setMobileMenuVisible(false);
                  }} 
                  className="w-full flex items-center gap-2 text-gray-600"
                >
                  <Image src="/user.png" alt="Member Space" width={20} height={20} />
                  {t("Espace Membre")}
                </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
