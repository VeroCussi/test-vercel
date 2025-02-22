'use client';

import React, { useEffect, use } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { I18nextProvider } from 'react-i18next';
import i18nInstance from '../i18n'; // Asegúrate de que este sea el archivo de configuración que compartiste
import '../../styles/globals.css';
import { inter, ovink } from '../../fonts';


import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Nota: el hook `use` es experimental en Next.js para "desenvolver" promesas en el layout
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Desenvuelve la promesa para obtener el idioma
  const { lang } = use(params);

  // Cambia el idioma utilizando la instancia importada
  useEffect(() => {
    if (lang && i18nInstance.language !== lang) {
      i18nInstance.changeLanguage(lang);
    }
  }, [lang]);



  return (
    <I18nextProvider i18n={i18nInstance}>
    <html lang={lang} className={`${inter.variable} ${ovink.variable}`}>
      <Head>
      <title>Coaching prénatal & postnatal - Yobson</title>
      <meta
        name="description"
        content="Coaching prénatal et postnatal pour mamans et futures mamans. Programmes adaptés pour une grossesse active et une récupération post-partum optimale."
      />
      <meta name="keywords" content="Coach Sportive Prénatal Postnatal, Coaching prénatal, Coaching postnatal, Yobson" />
        {/* Script de Axeptio */}
        {/* <Script id="axeptio" strategy="beforeInteractive">
          {`
            window.axeptioSettings = {
              clientId: "67ac8261822ed6ddd492b810",
              cookiesVersion: "myCookiesVersion",
              googleConsentMode: {
                default: {
                  analytics_storage: "denied",
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  wait_for_update: 500
                }
              }
            };
            (function(d, s) {
              var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
              e.async = true; 
              e.src = "//static.axept.io/tcf/sdk.js"; 
              e.type = "module";
              t.parentNode.insertBefore(e, t);
            })(document, "script");
          `}
        </Script> */}
        {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.axeptio.on("cookies:complete", (consent) => {
                if (consent.google_analytics) {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-WTPYHPBG8T', { anonymize_ip: true });
                }
              });
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WTPYHPBG8T"></script> */}

        {/* a revisar el script de google analytics */}
        {/* <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WTPYHPBG8T');
        </script> */}
      </Head>
      <body>
        <Header />
        <main>
        {children}
        </main>
        <Footer />
        <Script id="axeptio" strategy="beforeInteractive">
          {`
            window.axeptioSettings = {
              clientId: "67ac8261822ed6ddd492b810",
              cookiesVersion: "myCookiesVersion",
              googleConsentMode: {
                default: {
                  analytics_storage: "denied",
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  wait_for_update: 500
                }
              }
            };
            (function(d, s) {
              var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
              e.async = true; 
              e.src = "//static.axept.io/tcf/sdk.js"; 
              e.type = "module";
              t.parentNode.insertBefore(e, t);
            })(document, "script");
          `}
        </Script>
        {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.axeptio.on("cookies:complete", (consent) => {
                if (consent.google_analytics) {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-WTPYHPBG8T', { anonymize_ip: true });
                }
              });
            `,
          }}
        /> */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-WTPYHPBG8T"></script> */}
      </body>
    </html>
    </I18nextProvider>
  );
}
