const express = require('express');
const authRouter = require('../routes/authRouter.js');
const jobsRouter = require('../routes/jobsRouter.js');
const candidatesRouter = require('../routes/candidatesRouter.js');
const companiesRouter = require('../routes/companiesRouter.js');
const applicationsRouter = require('../routes/applicationsRouter.js');
const uploadsRouter = require('../routes/uploadsRouter.js');
const reviewsRouter = require('../routes/reviewsRouter.js');

const version1Router = express.Router();

version1Router.use('/auth', authRouter);
version1Router.use('/jobs', jobsRouter);
version1Router.use('/candidates', candidatesRouter);
version1Router.use('/companies', companiesRouter);
version1Router.use('/applications', applicationsRouter);
version1Router.use('/uploads', uploadsRouter);
version1Router.use('/reviews', reviewsRouter);

module.exports = version1Router;