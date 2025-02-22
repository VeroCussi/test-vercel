"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ExpandableVideo = () => {
  // Referencia al contenedor del video que se animará
  const videoRef = useRef<HTMLDivElement>(null);
  // Referencia al contenedor padre para medir su ancho
  const containerRef = useRef<HTMLDivElement>(null);
  // MotionValue que representará el progreso (de 0 a 1) de la animación según el scroll
  const progress = useMotionValue(0);
  // Estado para almacenar el ancho del contenedor padre
  const [parentWidth, setParentWidth] = useState(0);

  // Actualiza el ancho del contenedor padre (se actualiza también al hacer resize)
  useEffect(() => {
    const updateParentWidth = () => {
      if (containerRef.current) {
        setParentWidth(containerRef.current.offsetWidth);
      }
    };

    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => window.removeEventListener("resize", updateParentWidth);
  }, []);

  // Calcula el progreso de la animación según el scroll.
  // Se inicia cuando el top del contenedor llega al centro de la pantalla,
  // y se completa al haber hecho scroll 300px.
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const start = window.innerHeight / 2; // el centro de la pantalla
        // Calcula el progreso; se limita entre 0 y 1
        const p = Math.min(Math.max((start - rect.top) / 300, 0), 1);
        progress.set(p);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Ejecutamos la función una vez al montar para tener el valor inicial
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progress]);

  // Creamos las transformaciones:
  // - Ancho: de 300px a ancho del contenedor padre (si aún no se ha medido, se usa 300px)
  // - Alto: de 200px a 660px
  // - Borde redondeado: de 12px a 4px
  const width = useTransform(progress, [0, 1], [300, parentWidth || 300]);
  const height = useTransform(progress, [0, 1], [200, 660]);
  const borderRadius = useTransform(progress, [0, 1], [12, 4]);

  return (
    <div ref={containerRef} className="w-full flex justify-start px-5 py-6">
      <motion.div
        ref={videoRef}
        className="overflow-hidden" // Se eliminan clases fijas de ancho/alto/borderRadius
        style={{
          width,
          height,
          borderRadius,
        }}
      >
        <video
          src="/videos/video-yobson.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ExpandableVideo;