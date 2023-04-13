import express from 'express'

const router = express.Router();

router.get('/showMe', httpShowCurrentUser);
router.post('/register', httpRegister);
router.post('/login', httpLogin);
router.delete('/logout', httpLogout);
router.post('/verify-email', httpVerifyEmail);
router.post('/forgot-password', httpForgotPassword);
router.post('/reset-password', httpResetPassword);

export { router as authRouter };