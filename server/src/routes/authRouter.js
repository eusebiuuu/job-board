const express = require('express');
const authController = require('../controllers/authController.js');

const authRouter = express.Router();

authRouter.get('/showMe', authController.showCurrentUser);
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authController.logout);
authRouter.post('/verifyEmail', authController.verifyEmail);
authRouter.post('/changeEmail', authController.changeEmail);
authRouter.post('/forgotPassword', authController.forgotPassword);
authRouter.post('/resetPassword', authController.resetPassword);

module.exports = authRouter;