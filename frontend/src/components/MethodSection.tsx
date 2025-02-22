import React from "react";
import { useTranslation } from 'react-i18next';
//import Image from "next/image";

const MethodSection: React.FC = () => {
  const { t } = useTranslation('MethodSection');

  const methods = t('methods', { returnObjects: true }) as {
    title: string;
    description: string;
    description2?: string;
    description3?: string;
    description4?: string;
  }[];


  return (
    <section className="relative z-40 bg-[#F9F8F8] rounded-b-[38px] py-16 px-6 md:px-6 lg:px-10 text-center">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="mx-auto max-w-[650px] text-center text-[#6F508D] text-[34px] sm:text-[40px] md:text-[60px] leading-[45px] sm:leading-[50px] px-6 pb-10 md:leading-[74.76px] font-semibold">
          {t('title')}
        </h2>

        <div className="columns-1 md:columns-2 gap-6 p-3 space-y-6 ">
            {methods.map((method, index) => (
              <div
                key={index}
                className="bg-white pt-6 sm:pt-10 px-6 sm:px-6 rounded-[18px] border border-[#6F508D] text-left pb-6 break-inside-avoid"
              >
                <h3 className="bg-[#6F508D] text-white font-bold text-[22px] sm:text-[34px] px-2 inline leading-tight box-decoration-clone">
                  {method.title}
                </h3>
                <p className="font-[inter] text-[14px] sm:text-[18px] text-[#6F508D] pt-[18px] ">{method.description}</p>
                <ul className="list-disc ml-5">
                  {method.description2 && <li className="font-[inter] text-[14px] sm:text-[18px] text-[#6F508D] pt-[18px]">{method.description2}</li>}
                  {method.description3 && <li className="font-[inter] text-[14px] sm:text-[18px] text-[#6F508D] pt-[18px]">{method.description3}</li>}
                </ul>
                {method.description4 && <p className="font-[inter] text-[14px] sm:text-[18px] text-[#6F508D] py-[18px]">{method.description4}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-[-20px] sm:mt-[-50px] md:mt-[-60px] lg:mt-[-30px]">
            <img src="/video2.png" alt="Vidéo 2" className="w-full max-w-[1200px]" />
          </div>
      </div>
    </section>
  );
};

export default MethodSection;
