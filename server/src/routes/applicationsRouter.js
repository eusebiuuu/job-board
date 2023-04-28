const express = require('express');
const applicationsController = require('../controllers/applicationsController.js');

const applicationsRouter = express.Router();

applicationsRouter.get('/', applicationsController.getApplications);
applicationsRouter.post('/:id', applicationsController.createApplication);
applicationsRouter.patch('/:jobID/:candidateID', applicationsController.hideApplication);
applicationsRouter.delete('/:id', applicationsController.deleteApplication);

module.exports = applicationsRouter;