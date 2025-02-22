"use client";

import React from "react";
import { useTranslation } from 'react-i18next';

interface Section {
  title: string;
  content: string;
}

export default function MentionsLegales() {
  const { t } = useTranslation('mentionsLegales');

  const sections = t('sections', { returnObjects: true }) as Record<string, Section>;

  return (
    <div className="w-full rounded-t-2xl bg-white">
    <section className="max-w-[900px] text-[#6F508D] bg-white m-auto px-6 py-10">
      <h1 className="text-3xl text-center font-bold mb-4">{t('title')}</h1>
      {Object.keys(sections).map((sectionKey) => (
      <section key={sectionKey} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t(`sections.${sectionKey}.title`)}</h2>
        <p>{t(`sections.${sectionKey}.content`)}</p>
      </section>
    ))}

    </section>
    </div>
  );
}
