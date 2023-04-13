import express from 'express'
import { authRouter } from '../routes/authRouter.mjs';
import { jobsRouter } from '../routes/jobsRouter.mjs';
import { candidatesRouter } from '../routes/candidatesRouter.mjs';
import { companiesRouter } from '../routes/companiesRouter.mjs';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/jobs', jobsRouter);
router.use('/candidates', candidatesRouter);
router.use('/company', companiesRouter);

export { router as version1Router };