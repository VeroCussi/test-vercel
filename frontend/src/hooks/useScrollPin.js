import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollPin = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Combina las opciones por defecto con las recibidas
    const defaultOptions = {
      trigger: element,
      start: "top top",
      end: "+=1000",
      pin: true,
      pinSpacing: false,
      // markers: true, // descomenta para debugging
    };

    const config = { ...defaultOptions, ...options };

    // Crea el ScrollTrigger
    const triggerInstance = ScrollTrigger.create(config);

    // Cleanup
    return () => {
      triggerInstance.kill();
    };
  }, [ref, options]);
};

export default useScrollPin;

// Version con from to

// useScrollAnimation.js (o .ts si usas TypeScript)
// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const useScrollPin = (ref, from, to, triggerOptions = {}) => {
//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     // Aplica la animación de gsap con scrollTrigger
//     gsap.fromTo(
//       element,
//       from,
//       {
//         ...to,
//         scrollTrigger: {
//           trigger: element,
//           ...triggerOptions,
//         },
//       }
//     );
//     // Opcionalmente, puedes retornar una función de limpieza para destruir el ScrollTrigger:
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [ref, from, to, triggerOptions]);
// };

// export default useScrollPin;

