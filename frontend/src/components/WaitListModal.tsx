import { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

interface RegisterWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<RegisterWaitlistModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('waitlistModal');
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !isChecked) {
      alert("Veuillez remplir tous les champs et accepter la politique de confidentialité.");
      return;
    }

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://yobson.shop:8080";
      
      // Asigna la respuesta a una variable
      const response = await axios.post(`${baseURL}/api/subscribe`, {
        email: formData.email,
        attributes: { PRENOM: formData.name },
        listId: process.env.NEXT_PUBLIC_LIST_ID_FORM4,
      });

      if (response.status === 200) {
        setSuccessMessage("Merci ! Vous avez été ajouté à la liste d'attente.");
        setFormData({ name: "", email: "" });
        setIsChecked(false);
        setTimeout(onClose, 2000);
      } else {
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur d'inscription :", error.response?.data || error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
      alert("Échec de l'abonnement. Vérifiez les informations et réessayez.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-[30px] font-semibold text-left text-[#6F508D]">{t('title')}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-[#6F508D]">{t('nameLabel')}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border text-[#6F508D] rounded mt-1 mb-3"
            placeholder={t('placeholder')}
            required
          />
          <label className="block text-[#6F508D] mt-3">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 text-[#6F508D] border rounded mt-1 mb-3"
            placeholder="Email"
            required
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2"
            />
            <span className="text-[12px] text-gray-700">
            {t('checkboxText')}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6F508D] text-white py-2 mt-4 rounded hover:bg-purple-700"
          >
            {t('submitButton')}
          </button>
        </form>
        {successMessage && (
          <p className="text-[#39BACD] text-center mt-3">{successMessage}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline block text-center"
        >
          {t('closeButton')}
        </button>
      </div>
    </div>
  );
};

export default WaitlistModal;
