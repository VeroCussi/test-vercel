import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="w-full bg-[#3F2B5D] text-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-8">
        
        {/* Columna Izquierda */}
        <div className="flex flex-col justify-between items-start">
          <div>
            <h2 className="text-[40px] font-[600]">{t("name")}</h2>
            <h3 className="text-[40px] font-[600]">{t("title")}</h3>
            <p className="text-[24px] text-white mt-2">
            {t("subtitle")}
            </p>
          </div>

          {/* Copyright (Solo visible en md o más) */}
          <p className="text-[14px] text-gray-400 hidden md:block" dangerouslySetInnerHTML={{ __html: t("copyright") }} />
        </div>

        {/* Columna Central - Alineada a la izquierda en móviles */}
        <div className="flex flex-col justify-between items-start">
          <ul className="mt-2 space-y-1">
          <li>{t("programs.pregnancy")}</li>
            <li>{t("programs.postpartum")}</li>
            <li>{t("programs.personalized")}</li>
            <li>{t("programs.prenatal")}</li>
            <li>{t("programs.postnatal")}</li>
            <li>{t("programs.partner")}</li>

          </ul>

          {/* Contacto alineado abajo */}
          <div>
            <h4 className="pt-20 text-[14px] font-bold text-gray-400 uppercase tracking-wide">
            {t("contact.availability")}
            </h4>
            <p className="mt-2 text-[18px] font-medium">{t("contact.phone")}</p>
            <p className="text-[16px] text-gray-300">{t("contact.email")}</p>
          </div>
        </div>

        {/* Columna Derecha - Logo y Redes Sociales alineadas a la izquierda en móviles */}
        <div className="flex flex-col justify-between items-end">
          {/* logo */}
          <div>
            <Image
              src="/logo-yobson.png"
              alt="Logo Yobson"
              width={88}
              height={88}
            />
          </div>

          {/* RRSS */}
          <div className="flex flex-row md:flex-col lg:flex-row gap-4">
            <a
              href="https://www.instagram.com/diane_yobson"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-500 transition"
            >
              {t("socials.instagram")}
            </a>
            <a
              href="https://wa.me/330667295291"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-500 transition"
            >
              {t("socials.whatsapp")}
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-500 transition"
            >
              {t("socials.youtube")}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright mobile */}
      <p className="text-[14px] text-gray-400 mt-10 text-center w-full md:hidden" dangerouslySetInnerHTML={{ __html: t("copyright") }} />
    </footer>
  );
};

export default Footer;
