const { User } = require('../models');

const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const xss = require('xss'); //Protection contre les attaques xss



//Schema de validation joi pour création de compte

const schema = Joi.object({
    utilisateur: Joi.string().required(),
    prenom: Joi.string().required(),
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
    telephone: Joi.string().required(),
    password: Joi.string().min(8).required(),
    langue: Joi.string().optional()
});

//Schema de validation joi pour connexion

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

// Schema de validation pour modification

  const updateSchema = Joi.object({
    utilisateur: Joi.string().optional(),
    prenom: Joi.string().optional(),
    nom: Joi.string().optional(),
    email: Joi.string().optional(),
    telephone: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    langue: Joi.string().optional(),
    currentPassword: Joi.string().optional().strip(),
}).min(1);

// Afficher tout les utilisateurs

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un nouvel utilisateur

exports.signup = async (req, res) => {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
        // Extract browser language
        const browserLang = req.headers['accept-language']?.split(',')[0]?.substring(0, 2) || 'fr';
        const allowedLanguages = ['en', 'fr', 'es', 'de']; // Adjust according to supported languages
        const langue = allowedLanguages.includes(browserLang) ? browserLang : 'en';

      const sanitizedEmail = xss(value.email);
      const existingUser = await User.findOne({ where: { email: sanitizedEmail } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      // Cryptage du password
      const hash = await bcrypt.hash(value.password, 10);
      // Récupération de l'adresse ip
      const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
  
      const user = await User.create({
        civilite: xss(value.civilite),
        utilisateur: xss(value.utilisateur),
        prenom: xss(value.prenom),
        nom: xss(value.nom),
        email: sanitizedEmail,
        telephone: xss(value.telephone),
        langue: langue,
        password: hash,
        adresse_ip: ip,
      });
  
      res.status(201).json({ message: 'User created!' });
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: error.message });
    }
  };

// Connexion

exports.login =  async (req, res, next) => {
    try {
        // Vérification des inputs
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Protection du champ mail
        const sanitizedEmail = xss(req.body.email);

        const user = await User.findOne({ where: { email: sanitizedEmail } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //bcrypt vérifie la conformité du mot de passe
        const valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //Création et encodage d'un jsonwebtoken

        const token = jwt.sign(
            { 
            user_id: user.id, 
             }, 
            process.env.JWT_PRIVATE_KEY,
            { algorithm: 'RS256', 
            expiresIn: '2h',
            audience: 'yobson', 
            issuer: 'yobson' 
            } 
        );

        //stockage du jsonwebtoken dans le cookiehttp.

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 
        });
        res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login' });
    }
};

exports.getAuthenticatedUser = async (req, res) => {
  try {
      const userId = req.auth.user_id;
      const user = await User.findByPk(userId, { 
          attributes: ['id', 'username', 'prenom', 'nom', 'email'] 
      });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error in getAuthenticatedUser:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
}


// Déconnexion

exports.logout = async (req, res, next) =>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.status(200).json({ message: 'Logged out successfully' });
}


// Afficher un seul utilisateur
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['prenom', 'nom', 'email'] 
        });

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Mettre à jour un utilisateur
exports.updateUser = async (req, res, next) => {
    try {
      console.log('Auth:', req.auth);
      console.log('Update Payload:', req.body);
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      //Check le password pour le changement de password
      if (req.body.currentPassword) {
        const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!validPassword) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }
      }
  
      const { error, value } = updateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const userObject = { ...value };
  
      for (let key in userObject) {
        if (typeof userObject[key] === 'string') {
          userObject[key] = xss(userObject[key]);
        }
      }
        //Cryptage du nouveau password si présent

      if (userObject.password) {
        userObject.password = await bcrypt.hash(userObject.password, 10);
      }
  
      delete userObject.id;
      delete userObject.created_at;

  
      await user.update(userObject);
      res.status(200).json({ message: 'User modified!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Supprimer l'utilisateur
exports.deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
    
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      await User.destroy({ where: { id: userId } });
  
      res.status(200).json({ message: 'User deleted succefully!' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  };