import React, { useState } from "react";
import { InlineWidget } from "react-calendly";
import axios from "axios";
import { useTranslation } from 'react-i18next';

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedForm: string | null; // Formulario seleccionado
}

const StepModal: React.FC<StepModalProps> = ({ isOpen, onClose, selectedForm }) => {
  const { t } = useTranslation('stepModal');
  // Estado para el avance del paso y las respuestas del cuestionario
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Estado para los datos del formulario (Paso 5)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "+33", // Prefijo por defecto
  });

  const [submitted, setSubmitted] = useState(false);

  // Definir el número de pasos según el formulario:
  // prenatal: 5 pasos de cuestionario y Calendly en el paso 6
  // postnatal y global: 6 pasos de cuestionario y Calendly en el paso 7
  const questionnaireSteps = selectedForm === "prenatal" ? 5 : 6;
  const finalStep = questionnaireSteps + 1;

  // Objeto para mapear el formulario seleccionado a la URL del PDF
  const pdfLinks: { [key: string]: string } = {
    prenatal: "https://qogqafedua51ovly.public.blob.vercel-storage.com/pdfyobson/prenatal-dHt75N44XkbEFJqtXdksQi9OkAzOG8.pdf",
    postnatal: "https://ginsengweb-my.sharepoint.com/:b:/g/personal/anais_ginsengweb_fr/EWUKKPcyHghLsYHOYBKn_WMBO0utB8RwW6T9VHau0bAtow?e=3U1Gz5",
    global: "https://ginsengweb-my.sharepoint.com/:b:/g/personal/anais_ginsengweb_fr/EfnJ4Qf6rGFGv3FHuK5rvpEBfjWp0M6UE0YupzxfOr_k1Q?e=4g9t2x",
  };

  // Función para actualizar las respuestas del cuestionario
  const handleSelect = (stepKey: string, value: string) => {
    console.log(`Setting ${stepKey} to ${value}`);
    setAnswers((prev) => ({ ...prev, [stepKey]: value }));
  };

  // Función para actualizar los datos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar los datos del formulario usando Axios
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
        await axios.post(`${apiUrl}/api/subscribe`, {
          email: formData.email,
          attributes: {
            PRENOM: formData.nombre,
            SMS: formData.telefono,
            AGE: answers.age,
            PREMIER_ENFANT: answers.premierEnfant,
            TRIMESTRE: answers.trimestre,
            ACTIVITE_AVANT: answers.activiteAvant,
            SANTE_ENCEINTE: answers.santeEnceinte,
            OBJECTIF: answers.objectif,
            DISPONIBILITE: answers.disponibilite,
          },
          listId: process.env.NEXT_PUBLIC_LIST_ID_FORM1,
        });
      alert("Utilisateur ajouté avec succès");
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Échec de l'abonnement");
    }
  };

  //Formulario Bilan Postnatal
  const handleSubmitPostnatal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
      await axios.post(`${apiUrl}/api/subscribe`, {
        email: formData.email,
        attributes: {
          PRENOM: formData.nombre,
          SMS: formData.telefono,
          AGE: answers.age,
          PREMIER_ENFANT: answers.premierEnfant,
          TRIMESTRE: answers.trimestre,
          REDUCATION: answers.reducation,
          ACTIVE_AVANT: answers.activeAvant,
          DISPONIBILITE: answers.disponibilite,
        },
        listId: process.env.NEXT_PUBLIC_LIST_ID_FORM2,
      });
  
      alert("Utilisateur ajouté avec succès");
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Échec de l'abonnement");
    }
  };
  

  //Formulario Bilan Postnatal
  const handleSubmitGlobal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
        await axios.post(`${apiUrl}/api/subscribe`, {
          email: formData.email,
          attributes: {
            PRENOM: formData.nombre,
            SMS: formData.telefono,
            AGE: answers.age,
            PREMIER_ENFANT: answers.premierEnfant,
            TRIMESTRE: answers.trimestre,
            REDUCATION: answers.reducation,
            ACTIVE_AVANT: answers.activeAvant,
            DISPONIBILITE: answers.disponibilite,
          },
          //formType: "postnatal",
          listId: process.env.NEXT_PUBLIC_LIST_ID_FORM3,
        });
      alert("Utilisateur ajouté avec succès");
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Échec de l'abonnement");
    }
  };

const nextStep = () => {
  
    // Determinar qué función de validación usar según el formulario seleccionado
    let isValid;
    if (selectedForm === "postnatal") {
        isValid = isStepValidPostnatal(step);
    } else if (selectedForm === "global") {
        isValid = isStepValidGlobal(step);
    } else {
        isValid = isStepValid(step);
    }

    // Verificar la validación antes de avanzar
    if (isValid) {
        setStep((prev) => Math.min(prev + 1, finalStep));
    } else {
        alert("Veuillez sélectionner une option avant de continuer.");
    }
};

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Validar que cada paso tenga los datos necesarios para continuar de PRENATAL
  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return answers.age && answers.premierEnfant;
      case 2:
        return answers.trimestre;
      case 3:
        return answers.activiteAvant && answers.santeEnceinte;
      case 4:
        return answers.objectif && answers.disponibilite;
      case 5:
        return formData.nombre && formData.email && formData.telefono;
      default:
        return true;
    }
  };

  const isStepValidPostnatal = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return answers.age && answers.premierEnfant; 
      case 2:
        return answers.trimestre; // Aquí se guarda cuánto tiempo hace que tuvo al bebé
      case 3:
        return answers.reducation !== undefined; // Si hizo reeducación o no
      case 4:
        return answers.activeAvant !== undefined; // Si era activa antes del embarazo
      case 5:
        return answers.disponibilite !== undefined; // Disponibilidad para entrenar
      case 6:
        return formData.nombre && formData.email && formData.telefono; // Datos personales
      default:
        return true;
    }
  };

  const isStepValidGlobal = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return answers.age && answers.premierEnfant; 
      case 2:
        return answers.trimestre; // Aquí se guarda cuánto tiempo hace que tuvo al bebé
      case 3:
        return answers.reducation !== undefined; // Si hizo reeducación o no
      case 4:
        return answers.activeAvant !== undefined; // Si era activa antes del embarazo
      case 5:
        return answers.disponibilite !== undefined; // Disponibilidad para entrenar
      case 6:
        return formData.nombre && formData.email && formData.telefono; // Datos personales
      default:
        return true;
    }
  };

  // Función que descarga el PDF y luego pasa al último paso (Calendly)
  const handleDownloadAndNext = () => {
    const pdfUrl = selectedForm ? pdfLinks[selectedForm] : null;
    if (pdfUrl) {
      // Crea un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.href = pdfUrl;
      // Asegúrate de que el nombre del archivo coincide con el del PDF en public/pdf/
      link.download = pdfUrl.split("/").pop() || "download.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No PDF available for download.");
    }
    // Una vez descargado, navega al último paso para reservar con Calendly
    setSubmitted(false);
    setStep(finalStep);
  };
  
// If the modal is closed, we don't render anything
  if (!isOpen) return null;

  // Si el formulario se ha enviado, mostramos el mensaje de agradecimiento y el botón de descarga
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-[#6F508D] bg-opacity-100 flex justify-center items-center z-50">
        <div className="relative w-full max-w-3xl bg-white rounded-xl p-10 shadow-lg text-center">
          <button
            className="absolute top-0 right-6 text-gray-300 hover:text-gray-700 text-3xl"
            onClick={onClose}
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold text-[#72B7C3] mb-4">
          {t('messages.success')}
          </h2>
          <p className="text-[17px] text-[#6F508D] mb-6">
            {t('messages.downloadPrompt')}
          </p>
          {/* Al hacer clic, se descarga el PDF y se pasa al paso 6 (Calendly) */}
          <button
            onClick={handleDownloadAndNext}
            className="px-6 py-3 bg-[#6F508D] text-white rounded-lg hover:bg-[#5C3D76] transition duration-300"
          >{t('buttons.download')}
            </button>
        
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-[#6F508D] bg-opacity-100 flex justify-center items-center z-30
      md:bg-cover md:bg-no-repeat md:bg-center
      ${selectedForm === "prenatal" ? "md:bg-[url('/femme-enceinte.png')]"
        : selectedForm === "postnatal" ? "md:bg-[url('/postnatal.png')] md:bg-right md:bg-contain"
        : "md:bg-[url('/global.png')] md:bg-right md:bg-contain"}`}>
      <div className="relative w-full h-[780px] flex items-center justify-center">
        {/* Botón de Cerrar */}
        <button 
          className="absolute top-0 right-6 text-gray-300 hover:text-gray-700 text-3xl"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Prenatal Container */}
        {selectedForm === "prenatal" && (
        <div className="relative w-[90%] max-w-[1400px] h-[550px] flex items-center">
          {/* Sección Izquierda: Formulario y cuestionario */}
          <div className="w-[630px] h-[550px] bg-white rounded-xl p-10 shadow-lg relative z-10 overflow-y-auto">
            {/* Barra de Progreso */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <div key={num} className="flex items-center space-x-2">
                  {/* Número del Paso clicable */}
                  <div 
                    className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer font-normal text-[9px]
                      ${step >= num ? "bg-[#6F508D] text-white" : "bg-[#EFF0F6] text-[#6F508D]"}`}
                    onClick={() => num < step && setStep(num)} // Permite retroceder
                  >
                    {num}
                  </div>
                  {/* Barra de Progreso */}
                  {index < 5 && (
                    <div className="w-10 h-1 rounded-full relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#6F508D] rounded-l-full transition-all duration-300"
                        style={{ width: step > num ? "100%" : step === num ? "50%" : "0%" }}
                      ></div>
                      <div 
                        className="absolute top-0 right-0 h-full bg-[#EFF0F6] rounded-r-full"
                        style={{ width: step > num ? "0%" : step === num ? "50%" : "100%" }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contenido de cada paso del formulario Prenatal */}
            <div className="mt-4">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#72B7C3] pb-6">{t('titles.prenatal')}</h2>
                  <p className="mt-2 font-semibold text-[17px] text-[#6F508D]">
                  {t('text.text')}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-10">
                    {/* Columna Izquierda - Edad */}
                    <div>
                      <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.age')}</p>
                      <div className="space-y-3 mt-2">
                        {(t('options.age', { returnObjects: true }) as string[]).map((option, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="radio" 
                              name="age" 
                              value={option} 
                              checked={answers.age === option}
                              onChange={() => handleSelect("age", option)}
                              className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                            />
                            <span className="text-[14px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {/* Columna Derecha - Primer Hijo */}
                    <div>
                      <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.firstChild')}</p>
                      <div className="space-y-3 mt-2">
                        {(t('options.firstChild', { returnObjects: true }) as string[]).map((option, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="radio" 
                              name="premierEnfant" 
                              value={option} 
                              checked={answers.premierEnfant === option}
                              onChange={() => handleSelect("premierEnfant", option)}
                              className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                            />
                            <span className="text-[14px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-[#72B7C3] pb-6">{t('titles.prenatal')}</h2>
                  <p className="mt-2 font-semibold text-[17px] text-[#6F508D] pb-6">
                  {t('text.text')}
                  </p>
                  <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.trimester')}</p>
                  <div className="space-y-3 mt-2 pb-6">
                    {(t('options.trimester', { returnObjects: true }) as string[]).map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="trimestre"
                          checked={answers.trimestre === option}
                          onChange={() => handleSelect("trimestre", option)}
                          className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                        />
                        <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mt-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.prenatal')}</h2>
                  <p className="mt-2 font-semibold text-[17px] text-[#6F508D]">
                  {t('text.text')}
                  </p>
                  <div className="mt-6 flex flex-col md:grid md:grid-cols-2 md:gap-10">
                    {/* Columna Izquierda - Actividad antes del embarazo */}
                    <div className="mb-6 md:mb-0">
                        <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.activityBefore')}</p>
                        <div className="space-y-3 mt-2">
                          {(t('options.activity', { returnObjects: true }) as string[]).map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                              <input 
                                type="radio" 
                                name="activiteAvant" 
                                checked={answers.activiteAvant === option}
                                onChange={() => handleSelect("activiteAvant", option)}
                                className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                              />
                              <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    {/* Columna Derecha - Estado actual */}
                    <div>
                      <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.currentState')}</p>
                      <div className="space-y-3 mt-2">
                      {(t('options.currentState', { returnObjects: true }) as string[]).map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="santeEnceinte" 
                            checked={answers.santeEnceinte === option}
                            onChange={() => handleSelect("santeEnceinte", option)}
                            className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                          />
                          <span className="text-[15px] md-[17px] font-medium text-[#6F508D]">{option}</span>
                        </label>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="mt-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.prenatal')}</h2>
                  <p className="mt-2 font-semibold text-[17px] text-[#6F508D]">
                  {t('text.text')}
                  </p>
                  <div className="mt-6 flex flex-col md:grid md:grid-cols-2 md:gap-10">
                    {/* Columna Izquierda - ¿Qué buscas? */}
                    <div className="mb-6 md:mb-0">
                      <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.objective')}</p>
                      <div className="space-y-3 mt-2">
                        {(t('options.objective', { returnObjects: true }) as string[]).map((option, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="radio" 
                              name="objectif" 
                              checked={answers.objectif === option}
                              onChange={() => handleSelect("objectif", option)}
                              className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                            />
                            <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                          </label>
                        ))}
                      </div>

                    </div>
                    {/* Columna Derecha - Disponibilidades */}
                    <div>
                      <p className="text-base md-[17px] font-medium text-[#6F508D] md:pb-6">{t('questions.availability')}</p>
                      <div className="space-y-3 mt-2">
                        {(t('options.availability', { returnObjects: true }) as string[]).map((option, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input 
                              type="radio" 
                              name="disponibilite" 
                              checked={answers.disponibilite === option}
                              onChange={() => handleSelect("disponibilite", option)}
                              className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400" 
                            />
                            <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-[#72B7C3]">{t('titles.prenatal')}</h2>
                  {/* Formulario para recolectar datos personales */}
                  <form onSubmit={handleSubmit}>
                    <div className="mt-6 grid grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-[17px] font-medium text-[#6F508D]">{t('form.name')}</label>
                        <input 
                          type="text" 
                          name="nombre"
                          placeholder="Écris ici" 
                          value={formData.nombre}
                          onChange={handleChange}
                          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent" 
                          required
                        />
                      </div>
                      {/* Email */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-[17px] font-medium text-[#6F508D]">{t('form.email')}</label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Écris ici" 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent" 
                          required
                        />
                      </div>
                      {/* Phone */}
                      <div className="col-span-2">
                        <label className="text-[17px] font-medium text-[#6F508D]">{t('form.phone')}</label>
                        <input 
                          type="tel" 
                          name="telefono"
                          placeholder="Écris ici" 
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent" 
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="mt-4 bg-[#6F508D] text-white py-2 px-4 rounded-md hover:bg-[#5C3D76] transition duration-300"
                    >
                      {t('buttons.submit')}
                    </button>
                  </form>
                </div>
              )}

              {step === 6 && (
                <div className="w-full max-w-[800px] bg-white rounded-xl p-10 shadow-lg relative z-10">
                  <h2 className="text-2xl font-bold text-[#72B7C3] text-center">
                  {t('messages.schedule')}
                  </h2>
                  <p className="mt-2 text-center text-[15px] text-[#6F508D]">
                  {t('messages.schedulePrompt')}
                  </p>
                  {/* Widget de Calendly */}
                  <div className="mt-6 flex justify-center">
                    <InlineWidget 
                      url="https://calendly.com/dianeyobson" 
                      styles={{
                        width: "100%",
                        minHeight: "450px",
                        height: "auto",
                        borderRadius: "8px",
                      }} 
                      prefill={{
                        email: "",
                        firstName: "",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="absolute left-0 w-full px-10 py-10 flex justify-between items-center">
              <button 
                className="px-3 md:px-6 py-3 rounded-lg text:md md:text-lg bg-gray-300 text-gray-700" 
                onClick={prevStep} 
                disabled={step === 1}
              >
                {t('buttons.back')}
              </button>
              {step < 5 ? (
                <button 
                  className={`px-3 md:px-6 py-3 rounded-lg text:md md:text-lg flex-1 ml-4 ${
                    isStepValid(step)
                      ? "bg-[#6F508D] text-white hover:bg-[#72B7C3]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={nextStep}
                  disabled={!isStepValid(step)}
                >
                  {t('buttons.next')}
                </button>
              ) : (
                <button 
                  className="px-6 py-3 bg-[#6F508D] text-white rounded-lg flex-1 ml-4" 
                  onClick={() => setStep(6)}
                >
                  {t('buttons.finish')}
                </button>
              )}
            </div>
          </div>
        </div>
         )}

         {/* Formulario Bilan Postnatal */}
         {selectedForm === "postnatal" && (
            <div className="relative w-[90%] max-w-[1400px] h-[550px] flex items-center">
                {/* Contenedor principal: barra de progreso, contenido y botones */}
                <div className="w-[630px] h-[550px] bg-white rounded-xl p-10 shadow-lg relative z-10 overflow-y-auto">
                {/* Barra de Progreso */}
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                    <div key={num} className="flex items-center space-x-2">
                        {/* Número del paso */}
                        <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer font-normal text-[9px] ${
                            step >= num ? "bg-[#6F508D] text-white" : "bg-[#EFF0F6] text-[#6F508D]"
                        }`}
                        onClick={() => num < step && setStep(num)}
                        >
                        {num}
                        </div>
                        {/* Barra entre pasos */}
                        {index < 6 && (
                        <div className="w-10 h-1 rounded-full relative">
                            <div
                            className="absolute top-0 left-0 h-full bg-[#6F508D] rounded-l-full transition-all duration-300"
                            style={{ width: step > num ? "100%" : step === num ? "50%" : "0%" }}
                            ></div>
                            <div
                            className="absolute top-0 right-0 h-full bg-[#EFF0F6] rounded-r-full"
                            style={{ width: step > num ? "0%" : step === num ? "50%" : "100%" }}
                            ></div>
                        </div>
                        )}
                    </div>
                    ))}
                </div>

                {/* Contenido de cada paso */}
                <div className="mt-4">
                    {step === 1 && (
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        <p className="mt-2 font-semibold text-[17px] text-[#6F508D]">
                        {t('text.text1')}
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-10">
                        {/* Columna Izquierda: Edad */}
                        <div>
                            <p className="text-[15px] md-[17px] font-medium text-[#6F508D]">{t('questions.age')}</p>
                            <div className="space-y-3 mt-2">
                              {(t('options.age', { returnObjects: true }) as string[]).map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="age"
                                    value={option}
                                    checked={answers.age === option}
                                    onChange={() => handleSelect("age", option)}
                                    className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                                  />
                                  <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                                </label>
                              ))}
                            </div>

                        </div>
                        {/* Columna Derecha: Primer hijo */}
                        <div>
                            <p className="text-[15px] md-[17px] font-medium text-[#6F508D]">{t('questions.firstChild')}</p>
                            <div className="space-y-3 mt-2">
                              {(t('options.firstChild', { returnObjects: true }) as string[]).map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="premierEnfant"
                                    value={option}
                                    checked={answers.premierEnfant === option}
                                    onChange={() => handleSelect("premierEnfant", option)}
                                    className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                                  />
                                  <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                                </label>
                              ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

                    {step === 2 && (
                    <div className="mt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        <p className="mt-2 font-semibold text-[17px] text-[#6F508D] md:pb-6">
                        {t('text.text1')}
                        </p>
                        <p className="text-[15px] md-[17px] font-medium text-[#6F508D]">{t('questions.postpartum')}</p>
                        <div className="space-y-3 mt-2">
                          {(t('options.postpartum', { returnObjects: true }) as string[]).map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="trimestre"
                                checked={answers.trimestre === option}
                                onChange={() => handleSelect("trimestre", option)}
                                className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                              />
                              <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                            </label>
                          ))}
                        </div>
                    </div>
                    )}

                    {step === 3 && (
                    <div className="mt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        <p className="mt-2 font-semibold text-[17px] text-[#6F508D] md:pb-6">
                        {t('text.text1')}
                        </p>
                        <p className="text-[15px] md-[17px] font-medium text-[#6F508D]">{t('questions.reeducation')}</p>
                        <p className="text-[15px] md-[17px] font-medium text-[#6F508D] pb-6">
                        {t('text.text2')}
                        </p>
                        <div className="space-y-3 mt-2">
                          {(t('options.reeducation', { returnObjects: true }) as string[]).map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="reducation"
                                checked={answers.reducation === option}
                                onChange={() => handleSelect("reducation", option)}
                                className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                              />
                              <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                            </label>
                          ))}
                        </div>
                    </div>
                    )}

                    {step === 4 && (
                    <div className="mt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        <div>
                            <p className="mt-2 font-semibold text-[17px] text-[#6F508D] md:pb-6">
                            {t('text.text1')}
                            </p>
                            <p className="text-[15px] md-[17px] font-medium pb-6 text-[#6F508D]">{t('questions.activityBefore')}</p>
                            <div className="space-y-3 mt-2">
                              {(t('options.activity', { returnObjects: true }) as string[]).map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="activeAvant"
                                    checked={answers.activeAvant === option}
                                    onChange={() => handleSelect("activeAvant", option)}
                                    className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                                  />
                                  <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                                </label>
                              ))}
                            </div>
                        </div>
                    </div>
                    )}

                    {step === 5 && (
                    <div className="mt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        
                        <div>
                            <p className="mt-2 font-semibold text-[17px] text-[#6F508D] md:pb-6">
                            {t('text.text1')}
                            </p>
                            <p className="text-[15px] md-[17px] font-medium pb-6 text-[#6F508D]">
                            {t('questions.availabilityPost')}
                            </p>
                            <div className="space-y-3 mt-2">
                              {(t('options.availability', { returnObjects: true }) as string[]).map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="disponibilite"
                                    checked={answers.disponibilite === option}
                                    onChange={() => handleSelect("disponibilite", option)}
                                    className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                                  />
                                  <span className="text-[15px] md:[17px] font-medium text-[#6F508D]">{option}</span>
                                </label>
                              ))}
                            </div>
                        </div>
                    </div>
                    )}

                    {step === 6 && (
                    <div className="mt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4 md:pb-6">{t('titles.postnatal')}</h2>
                        {/* Formulario de datos personales */}
                        <form onSubmit={handleSubmitPostnatal}>
                        <div className="mt-6 grid grid-cols-2 gap-6">
                            <div className="col-span-2 sm:col-span-1">
                            <label className="text-[17px] font-medium text-[#6F508D]">{t('form.name')}</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Écris ici"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                                required
                            />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                            <label className="text-[17px] font-medium text-[#6F508D]">{t('form.email')}</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Écris ici"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                                required
                            />
                            </div>
                            <div className="col-span-2">
                            <label className="text-[17px] font-medium text-[#6F508D]">{t('form.phone')}</label>
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Écris ici"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                                required
                            />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-[#6F508D] text-white py-2 px-4 rounded-md hover:bg-[#5C3D76] transition duration-300"
                        >
                            {t('buttons.submit')}
                        </button>
                        </form>
                    </div>
                    )}

                    {step === 7 && (
                    <div className="w-full max-w-[800px] bg-white rounded-xl p-10 shadow-lg relative z-10">
                        <h2 className="text-xl md:text-2xl font-bold text-[#72B7C3] pb-4">
                        {t('messages.schedule')}
                        </h2>
                        <p className="mt-2 text-center text-[15px] text-[#6F508D]">
                        {t('messages.schedulePrompt')}
                        </p>
                        {/* Widget de Calendly */}
                        <div className="mt-6 flex justify-center">
                        <InlineWidget
                            url="https://calendly.com/dianeyobson"
                            styles={{
                            width: "100%",
                            minHeight: "450px",
                            height: "auto",
                            borderRadius: "8px",
                            }}
                            prefill={{
                            email: "",
                            firstName: "",
                            }}
                        />
                        </div>
                    </div>
                    )}
                </div>

                {/* Botones de navegación */}
                <div className="absolute left-0 w-full px-10 py-10 flex justify-between items-center">
                    <button
                    className="px-3 md:px-6 py-3 bg-gray-300 text-gray-700 rounded-lg text-lg"
                    onClick={prevStep}
                    disabled={step === 1}
                    >
                    {t('buttons.back')}
                    </button>
                    {step < 6 ? (
                    <button
                        className={`px-3 md:px-6 py-3 rounded-lg text-lg flex-1 ml-4 ${
                            selectedForm === "postnatal" &&
                        isStepValidPostnatal(step)
                            ? "bg-[#6F508D] text-white hover:bg-[#72B7C3]"
                            : "bg-gray-400 cursor-not-allowed"
                        
                        }`}
                        onClick={nextStep}
                        disabled={
                            selectedForm === "postnatal"
                            ? !isStepValidPostnatal(step)
                            : !isStepValid(step)
                        }
                    >
                        {t('buttons.next')}
                    </button>
                    ) : (
                    <button
                        className="px-6 py-3 bg-[#6F508D] text-white rounded-lg flex-1 ml-4"
                        onClick={() => setStep(6)}
                    >
                        {t('buttons.finish')}
                    </button>
                    )}
                </div>
                </div>
            </div>
            )}


      {/* Formulario Bilan Global */}
      {selectedForm === "global" && (
        <div className="relative w-[90%] max-w-[1400px] h-[550px] flex items-center">
        {/* Contenedor principal: barra de progreso, contenido y botones */}
        <div className="w-[630px] h-[550px] bg-white rounded-xl p-10 shadow-lg relative z-10 overflow-y-auto">
        {/* Barra de Progreso */}
        <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
            <div key={num} className="flex items-center space-x-2">
                {/* Número del paso */}
                <div
                className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer font-normal text-[9px] ${
                    step >= num ? "bg-[#6F508D] text-white" : "bg-[#EFF0F6] text-[#6F508D]"
                }`}
                onClick={() => num < step && setStep(num)}
                >
                {num}
                </div>
                {/* Barra entre pasos */}
                {index < 6 && (
                <div className="w-10 h-1 rounded-full relative">
                    <div
                    className="absolute top-0 left-0 h-full bg-[#6F508D] rounded-l-full transition-all duration-300"
                    style={{ width: step > num ? "100%" : step === num ? "50%" : "0%" }}
                    ></div>
                    <div
                    className="absolute top-0 right-0 h-full bg-[#EFF0F6] rounded-r-full"
                    style={{ width: step > num ? "0%" : step === num ? "50%" : "100%" }}
                    ></div>
                </div>
                )}
            </div>
            ))}
        </div>

        {/* Contenido de cada paso */}
        <div className="mt-4">
            {step === 1 && (
            <div>
                <h2 className="text-2xl font-bold text-[#72B7C3] pb-6">{t('titles.global')}</h2>
                <p className="mt-2 font-semibold text-[17px] text-[#6F508D]">
                {t('text.text1')}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-10">
                {/* left: age */}
                <div>
                    <p className="text-[17px] font-medium text-[#6F508D]">{t('questions.age')}</p>
                    <div className="space-y-3 mt-2">
                      {(t('options.age', { returnObjects: true }) as string[]).map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="age"
                            value={option}
                            checked={answers.age === option}
                            onChange={() => handleSelect("age", option)}
                            className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                          />
                          <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                        </label>
                      ))}
                    </div>

                </div>
                {/* Right: first child */}
                <div>
                    <p className="text-[17px] font-medium text-[#6F508D]">{t('questions.firstChild')}</p>
                    <div className="space-y-3 mt-2">
                      {(t('options.firstChild', { returnObjects: true }) as string[]).map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="premierEnfant"
                            value={option}
                            checked={answers.premierEnfant === option}
                            onChange={() => handleSelect("premierEnfant", option)}
                            className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                          />
                          <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                        </label>
                      ))}
                    </div>
                </div>
                </div>
            </div>
            )}

            {step === 2 && (
            <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#72B7C3] pb-6">{t('titles.global')}</h2>
                <p className="mt-2 font-semibold text-[17px] text-[#6F508D] pb-6">
                {t('text.text3')}
                </p>
                <p className="text-[17px] font-medium text-[#6F508D] pb-6">{t('questions.postpartum')}</p>
                <div className="space-y-3 mt-2">
                  {(t('options.postpartum', { returnObjects: true }) as string[]).map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="trimestre"
                        checked={answers.trimestre === option}
                        onChange={() => handleSelect("trimestre", option)}
                        className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                      />
                      <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                    </label>
                  ))}
                </div>
            </div>
            )}

            {step === 3 && (
            <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#72B7C3] pb-6">{t('titles.global')}</h2>
                <p className="mt-2 font-semibold text-[17px] text-[#6F508D] pb-6">
                {t('text.text3')}
                </p>
                <p className="text-[17px] font-medium text-[#6F508D]">{t('questions.reeducation')}</p>
                <p className="text-[17px] font-medium text-[#6F508D] pb-6">
                {t('text.text2')}
                </p>
                <div className="space-y-3 mt-2">
                {(t('options.reeducation', { returnObjects: true }) as string[]).map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="reducation"
                      checked={answers.reducation === option}
                      onChange={() => handleSelect("reducation", option)}
                      className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                    />
                    <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            )}

            {step === 4 && (
            <div className="mt-6">
                <h2 className="text-2xl font-bold pb-6 text-[#72B7C3]">{t('titles.global')}</h2>
                <div>
                    <p className="mt-2 font-semibold text-[17px] text-[#6F508D] pb-6">
                    {t('text.text3')}
                    </p>
                    <p className="text-[17px] font-medium pb-6 text-[#6F508D]">{t('questions.activityBefore')}</p>
                    <div className="space-y-3 mt-2">
                      {(t('options.activity', { returnObjects: true }) as string[]).map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="activeAvant"
                            checked={answers.activeAvant === option}
                            onChange={() => handleSelect("activeAvant", option)}
                            className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                          />
                          <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                        </label>
                      ))}
                    </div>
                </div>
            </div>
            )}

            {step === 5 && (
            <div className="mt-6">
                <h2 className="text-2xl pb-6 font-bold text-[#72B7C3]">{t('titles.global')}</h2>
                
                <div>
                    <p className="mt-2 font-semibold text-[17px] text-[#6F508D] pb-6">
                    {t('text.text3')}
                    </p>
                    <p className="text-[17px] font-medium pb-6 text-[#6F508D]">
                    {t('questions.availability')}
                    </p>
                    <div className="space-y-3 mt-2">
                      {(t('options.availability', { returnObjects: true }) as string[]).map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="disponibilite"
                            checked={answers.disponibilite === option}
                            onChange={() => handleSelect("disponibilite", option)}
                            className="w-5 h-5 text-[#6F508D] focus:ring-[#6F508D] border-gray-400"
                          />
                          <span className="text-[17px] font-medium text-[#6F508D]">{option}</span>
                        </label>
                      ))}
                    </div>
                </div>
            </div>
            )}

            {step === 6 && (
            <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#72B7C3]">{t('titles.global')}</h2>
                {/* Formulario de datos personales */}
                <form onSubmit={handleSubmitGlobal}>
                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                    <label className="text-[17px] font-medium text-[#6F508D]">{t('form.name')}</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Écris ici"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                        required
                    />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                    <label className="text-[17px] font-medium text-[#6F508D]">{t('form.email')}</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Écris ici"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                        required
                    />
                    </div>
                    <div className="col-span-2">
                    <label className="text-[17px] font-medium text-[#6F508D]">{t('form.phone')}</label>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Écris ici"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F508D] focus:border-transparent"
                        required
                    />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-[#6F508D] text-white py-2 px-4 rounded-md hover:bg-[#5C3D76] transition duration-300"
                >
                    {t('buttons.submit')}
                </button>
                </form>
            </div>
            )}

            {step === 7 && (
            <div className="w-full max-w-[800px] bg-white rounded-xl p-10 shadow-lg relative z-10">
                <h2 className="text-2xl font-bold text-[#72B7C3] text-center">
                {t('messages.schedule')}
                </h2>
                <p className="mt-2 text-center text-[15px] text-[#6F508D]">
                {t('messages.schedulePrompt')}
                </p>
                {/* Widget de Calendly */}
                <div className="mt-6 flex justify-center">
                <InlineWidget
                    url="https://calendly.com/dianeyobson"
                    styles={{
                    width: "100%",
                    minHeight: "450px",
                    height: "auto",
                    borderRadius: "8px",
                    }}
                    prefill={{
                    email: "",
                    firstName: "",
                    }}
                />
                </div>
            </div>
            )}
        </div>

        {/* Botones de navegación */}
        <div className="absolute left-0 w-full px-10 py-10 flex justify-between items-center">
            <button
            className="px-3 md:px-6 py-3 bg-gray-300 text-gray-700 rounded-lg text-lg"
            onClick={prevStep}
            disabled={step === 1}
            >
            {t('buttons.back')}
            </button>
            {step < 6 ? (
            <button
                className={`px-3 md:px-6 py-3 rounded-lg text-lg flex-1 ml-4 ${
                    selectedForm === "global" &&
                isStepValidGlobal(step)
                    ? "bg-[#6F508D] text-white hover:bg-[#72B7C3]"
                    : "bg-gray-400 cursor-not-allowed"
                
                }`}
                onClick={nextStep}
                disabled={
                    selectedForm === "global"
                    ? !isStepValidGlobal(step)
                    : !isStepValid(step)
                }
            >
                {t('buttons.next')}
            </button>
            ) : (
            <button
                className="px-6 py-3 bg-[#6F508D] text-white rounded-lg flex-1 ml-4"
                onClick={() => setStep(6)}
            >
                {t('buttons.finish')}
            </button>
            )}
        </div>
        </div>
    </div>
      )}

      </div>
    </div>
  );
};

export default StepModal;
