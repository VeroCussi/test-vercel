const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/ctrlUser');
const auth = require('../middlewares/auth');
const checkUserAuth = require('../middlewares/checkUserAuth')

router.get('/validate-token', auth, (req, res) => {
    res.status(200).json({
        message: 'Token is valid',
        user: req.auth, 
    });
});
router.get('/me', auth, ctrlUser.getAuthenticatedUser);
router.post('/signup', ctrlUser.signup);
router.post('/login', ctrlUser.login);
router.post('/logout', auth, ctrlUser.logout);
router.get('/', auth, ctrlUser.getAllUsers);
router.get('/:id', auth, ctrlUser.getOneUser);
router.put('/:id', auth, checkUserAuth, ctrlUser.updateUser);
router.delete('/:id', auth, checkUserAuth, ctrlUser.deleteUser);

module.exports = router;
