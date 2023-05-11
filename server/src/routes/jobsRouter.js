const express = require('express')
const jobController = require('../controllers/jobsController.js');
const { authenticateUser, authorizePermissions, authenticateCandidate } = require('../middlewares/authentication.js');

const jobsRouter = express.Router();

jobsRouter.get('/announcements',  authenticateUser, authorizePermissions('company'), jobController.getAllAnnouncements);
jobsRouter.get('/candidates/:id',  authenticateUser, authorizePermissions('company'), jobController.getAllCandidates);
jobsRouter.get('/', authenticateCandidate, jobController.getAllJobs);
jobsRouter.get('/:id', jobController.getSingleJob);
jobsRouter.post('/', authenticateUser, authorizePermissions('company'), jobController.addJob);
jobsRouter.patch('/:id', authenticateUser, authorizePermissions('company'), jobController.editJob);
jobsRouter.delete('/:id', authenticateUser, authorizePermissions('company'), jobController.deleteJob);

module.exports = jobsRouter;