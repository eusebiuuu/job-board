import express from 'express'
import authRouter from '../routes/authRouter.mjs';
import jobsRouter from '../routes/jobsRouter.mjs';
import candidatesRouter from '../routes/candidatesRouter.mjs';
import companiesRouter from '../routes/companiesRouter.mjs';
import applicationsRouter from '../routes/applicationsRouter.mjs';

const version1Router = express.Router();

version1Router.use('/auth', authRouter);
version1Router.use('/jobs', jobsRouter);
version1Router.use('/candidates', candidatesRouter);
version1Router.use('/companies', companiesRouter);
version1Router.use('/applications', applicationsRouter);

export default version1Router;