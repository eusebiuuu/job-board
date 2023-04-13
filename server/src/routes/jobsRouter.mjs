import express from 'express'

const router = express.Router();

router.get('/', httpGetAllJobs);
router.get('/:id', httpGetSingleJob);
router.post('/', httpAddJob);
router.patch('/:id', httpEditJob);
router.delete('/:id', httpDeleteJob);

router.get('/appliedJobs', httpGetAppliedJobs); // add auth middleware

router.get('/announcements', httpGetAllAnnouncements); // add auth middleware

export { router as jobsRouter };