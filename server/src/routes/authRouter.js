const express = require('express');
const authController = require('../controllers/authController.js');
const { authenticateUser, showMeAuthentication } = require('../middlewares/authentication.js');

const authRouter = express.Router();

authRouter.get('/showMe', showMeAuthentication, authController.showCurrentUser);
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authenticateUser, authController.logout);
authRouter.post('/verifyEmail', authController.verifyEmail);
authRouter.post('/changeEmail', authenticateUser, authController.changeEmail);
authRouter.post('/forgotPassword', authController.forgotPassword);
authRouter.post('/resetPassword', authController.resetPassword);

module.exports = authRouter;