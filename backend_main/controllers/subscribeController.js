require("dotenv").config();
const axios = require("axios");

const BREVO_API_KEY = process.env.BREVO_API_KEY;

const subscribeUser = async (req, res) => {
  
    // Extraer datos correctamente
    const { email, attributes = {}, listId } = req.body;
    const nombre = attributes?.PRENOM || ""; 
    const telefono = attributes?.SMS || ""; 
    const answers = {
      age: attributes?.AGE || "",
      trimestre: attributes?.TRIMESTRE || "",
      activiteAvant: attributes?.ACTIVITE_AVANT || "",
      santeEnceinte: attributes?.SANTE_ENCEINTE || "",
      reducation: attributes?.REDUCATION || "",
      objectif: attributes?.OBJECTIF || "",
      disponibilite: attributes?.DISPONIBILITE || ""
    };
  
    // Verificar si los datos obligatorios están presentes
    if (!nombre || !email) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    const listIdToUse = listId ? parseInt(listId) : parseInt(process.env.BREVO_LIST_ID2);


    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/contacts",
        {
          email,
          attributes: {
            PRENOM: nombre,
            SMS: telefono,
            AGE: answers.age,
            TRIMESTRE: answers.trimestre,
            ACTIVITE_AVANT: answers.activiteAvant,
            SANTE_ENCEINTE: answers.santeEnceinte,
            REDUCATION: answers.reducation,
            OBJECTIF: answers.objectif,
            DISPONIBILITE: answers.disponibilite
          },
          listIds: [listIdToUse],
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
  
      res.status(200).json({ message: "Utilisateur ajouté avec succès", data: response.data });
  
    } catch (error) {
      console.error("Error sur Brevo:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "Erreur lors de l'ajout d'un utilisateur à Brevo" });
    }
  };
  

module.exports = { subscribeUser };
