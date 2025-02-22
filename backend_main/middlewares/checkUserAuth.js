const { User } = require('../models');

module.exports = async (req, res, next) => {
    try {
        
        const requestingUserId = req.auth.user_id;
        const requestedUserId = req.params.id; 
        const requestedUser = await User.findByPk(requestedUserId);

        if (!requestedUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        console.log('Requesting User ID:', req.auth.user_id);
console.log('Requested User ID:', req.params.id);


         // Si l'user vveut accéder à ses propres données
         if (requestingUserId.toString() === requestedUserId) {
            return next();
        }

        return res.status(403).json({ message: 'Access forbidden' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};