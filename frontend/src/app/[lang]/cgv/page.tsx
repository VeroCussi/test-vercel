"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const CGVPage = () => {
  const { t } = useTranslation("CGV");

  return (
    <div className="max-w-[900px] text-[#6F508D] bg-white m-auto px-6 py-10">
      <h1 className="text-3xl text-center font-bold mb-4">{t("title")}</h1>
      {Object.keys(t("sections")).map((key) => (
        <div key={key} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {t(`sections.${key}.title`)}
          </h2>
          <p>{t(`sections.${key}.content`)}</p>
        </div>
      ))}
    </div>
  );
};

export default CGVPage;
