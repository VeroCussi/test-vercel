import React, { useState } from "react";


interface ProgramCardProps {
  title: string;
  subtitle?: string;
  text: string;
  text1?: string;
  forfait?: string;
  formule?: string;
  /** Opcional: si no se pasan, se asume que no hay opciones de precio */
  prix?: string[];
  /** Opcional: solo se usa si hay opciones de precio */
  links?: string[];
  buttonText: string;
  isHighlighted?: boolean;
  defaultCheckedIndex?: number;
  isLargeText?: boolean;
  formType?: string;
  /** Función que se ejecuta si no se usa la redirección basada en enlaces */
  onClick?: (formType?: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({

  title,
  subtitle,
  text,
  text1 = "",
  forfait,
  formule,
  prix = [],
  links = [],
  buttonText,
  isHighlighted = false,
  // isLargeText = false,
  formType,
  onClick,
  defaultCheckedIndex = 0,
}) => {


  // Estado local para la opción seleccionada
  const [selectedPrice, setSelectedPrice] = useState(defaultCheckedIndex);

  // Función para renderizar el texto con asteriscos en rojo.
  const renderTextWithRedAsterisk = (text: string) => {
    // Separamos primero por asteriscos dobles
    const doubleParts = text.split("**");
    return doubleParts.map((part, index) => {
      if (index === doubleParts.length - 1) {
        const singleParts = part.split("*");
        return singleParts.map((singlePart, singleIndex) => (
          <React.Fragment key={`single-${singleIndex}`}>
            <span className="inline-flex items-center text-sm sm:text-base">
              {singlePart}
              {singleIndex < singleParts.length - 1 && (
                <span className="text-red-500 whitespace-nowrap text-xs sm:text-sm">*</span>
              )}
            </span>
          </React.Fragment>
        ));
      }
      return (
        <React.Fragment key={`double-${index}`}>
          <span className="inline-flex items-center text-sm sm:text-base">
            {part}
            {index < doubleParts.length - 1 && (
              <span className="text-red-500 whitespace-nowrap text-xs sm:text-sm">**</span>
            )}
          </span>
        </React.Fragment>
      );
    });
  };

  // Renderiza la sección de opciones de precio (radio buttons) si hay alguna.
  const renderPriceOptions = () => {
    if (prix.length > 0) {
      return (
        <div className="space-y-3 mb-6">
          {prix.map((item, index) => (
            <label key={index} className="flex items-center text-[18px] md:text-[20px] gap-2 cursor-pointer">
              <input
                type="radio"
                name={title}
                checked={selectedPrice === index}
                onChange={() => setSelectedPrice(index)}
                className={`appearance-none w-4 h-4 border-2 rounded-full flex items-center justify-center relative 
                  ${isHighlighted 
                    ? "border-white checked:border-white" 
                    : "border-[#6F508D] checked:border-[#6F508D]"} 
                  checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 
                  checked:after:bg-[#2CA2B4] checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 
                  checked:after:-translate-x-1/2 checked:after:-translate-y-1/2`}
              />
              {renderTextWithRedAsterisk(item)}
            </label>
          ))}
        </div>
      );
    }
    return null;
  };

  // Función para manejar el clic en el botón
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Si existen opciones de precio y enlaces, redirige al enlace correspondiente
    if (prix.length > 0 && links.length > 0) {
      if (links[selectedPrice]) {
        window.open(links[selectedPrice], "_blank");
        return;
      }
      console.error("Aucun lien n'a été défini pour l'option sélectionnée");
    }
    // Si no hay opciones de precio, ejecuta la función onClick que se haya definido
    if (onClick) {
      onClick(formType);
    }
  };

  return (
    <div
      className={`border-[1px] border-[#6F508D] rounded-[16px] flex flex-col h-auto lg:min-h-[550px] xl:h-auto p-6 
        ${isHighlighted ? "bg-[#6F508D] text-white" : "bg-white text-[#6F508D]"}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col justify-center pb-3">
          <h3 className="font-bold mb-1 flex flex-grow items-center text-[32px] sm:text-[52px] md:text-[35px] leading-[1]">{title}</h3>
        </div>
        {subtitle && (
          <div className="flex flex-col flex-grow justify-center pb-4">
            <p className={`text-[16px] sm:text-[26px] md:text-[17px] lg:text-[18px] font-inter font-bold ${isHighlighted ? "text-white" : "text-[#2CA2B4]"}`}>
            {subtitle}
            </p>
          </div>
        )}
        <p className="flex-grow text-[14px] sm:text-[23px] md:text-[18px] lg:text-[16px] font-inter font-medium mb-4 pb-2 flex items-center">{text}</p>
        {text1 && (
          <p className="flex-grow text-[14px] sm:text-[23px] md:text-[18px] lg:text-[16px] font-inter font-medium mb-4 pb-2 flex items-center">{text1}</p>
        )}
        {forfait && (
          <p className="font-inter text-[13px] sm:text-[20px] md:text-[14px] italic pb-2 mb-2">
            {renderTextWithRedAsterisk(forfait)}
          </p>
        )}
        {formule && <p className="text-[14px] sm:text-[23px] md:text-[23px] lg:text-[15px] font-bold pb-2 mb-1">{formule}</p>}
        {/* Se renderizan los radio buttons solo si hay opciones de precio */}
        {renderPriceOptions()}
        <button
          className="mt-auto bg-[#2CA2B4] text-white md:text-[18px] font-semibold py-3 rounded-xl hover:bg-[#258A9C] transition"
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
