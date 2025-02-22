import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

const TextEffect = () => {
  const { t } = useTranslation('TextEffect');

  const splitIntoLines = (text: string): string[] => {
    return text
      .split(/(?<=[.?!…])\s+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };


  const content = t('content', { returnObjects: true }) as Array<{ text: string }>;

  const allLines = content.flatMap((item: { text: string }) =>
    splitIntoLines(item.text).map((line) => ({
      text: line,
      visible: false,
    }))
  );

  interface LineComponentProps {
    text: string;
    index: number;
  }

  const LineComponent: React.FC<LineComponentProps> = ({ text, index }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && elementRef.current) {
            elementRef.current.classList.add("animate-fadeIn");
            elementRef.current.classList.remove("opacity-0");
            observer.disconnect();
          }
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -10% 0px"
        }
      );

      const currentElement = elementRef.current;
      if (currentElement) {
        observer.observe(currentElement);
      }

      return () => {
        if (currentElement) {
          observer.disconnect();
        }
      };
    }, []);

    return (
      <div 
        ref={elementRef}
        className="opacity-0 transition-opacity duration-1000 ease-in-out"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  };

  return (
    <div className="max-w-[550px] text-[18px] sm:text-[28px] md:text-[22px] font-regular leading-7 space-y-4 text-center md:text-left">
      {allLines.map((line, index) => (
        <LineComponent key={index} text={line.text} index={index} />
      ))}
    </div>
  );
};

export default TextEffect;

