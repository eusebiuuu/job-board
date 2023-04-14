import express from 'express'
import * as authController from '../controllers/authController.mjs'

const router = express.Router();

router.get('/showMe', authController.showCurrentUser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

export { router as authRouter };