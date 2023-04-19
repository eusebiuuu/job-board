import express from 'express'
import * as jobController from '../controllers/jobsController.mjs';

const jobsRouter = express.Router();

jobsRouter.get('/announcements', jobController.getAllAnnouncements);
jobsRouter.get('/candidates/:id', jobController.getAllCandidates);
jobsRouter.get('/', jobController.getAllJobs);
jobsRouter.get('/:id', jobController.getSingleJob);
jobsRouter.post('/', jobController.addJob);
jobsRouter.patch('/:id', jobController.editJob);
jobsRouter.delete('/:id', jobController.deleteJob);

export default jobsRouter;