import express from 'express'
import * as applicationsController from '../controllers/applicationsController.mjs'

const applicationsRouter = express.Router();

applicationsRouter.get('/', applicationsController.getApplications);
applicationsRouter.post('/:id', applicationsController.createApplication);
applicationsRouter.patch('/:jobID/:candidateID', applicationsController.hideApplication);
applicationsRouter.delete('/:id', applicationsController.deleteApplication);

export default applicationsRouter;