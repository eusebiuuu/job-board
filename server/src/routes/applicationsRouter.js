const express = require('express');
const applicationsController = require('../controllers/applicationsController.js');
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication.js');

const applicationsRouter = express.Router();

applicationsRouter.get(
  '/',
  authenticateUser,
  authorizePermissions('candidate'),
  applicationsController.getApplications
);
applicationsRouter.get(
  '/:id',
  authenticateUser,
  authorizePermissions('candidate'),
  applicationsController.getSingleApplication
);
applicationsRouter.post(
  '/:id',
  authenticateUser,
  authorizePermissions('candidate'),
  applicationsController.createApplication
);
applicationsRouter.patch(
  '/:jobID/:candidateID',
  authenticateUser,
  authorizePermissions('company'),
  applicationsController.hideApplication
);
applicationsRouter.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('candidate'),
  applicationsController.deleteApplication
);

module.exports = applicationsRouter;