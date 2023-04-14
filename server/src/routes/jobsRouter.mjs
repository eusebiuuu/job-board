import express from 'express'
import * as jobController from '../controllers/jobsController.mjs';

const router = express.Router();

router.get('/appliedJobs', jobController.getAppliedJobs);

router.get('/announcements', jobController.getAllAnnouncements);

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getSingleJob);
router.post('/', jobController.addJob);
router.patch('/:id', jobController.editJob);
router.delete('/:id', jobController.deleteJob);

export { router as jobsRouter };