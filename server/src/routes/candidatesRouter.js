const express = require('express');
const candidatesController = require('../controllers/candidatesController.js');
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication.js');

const candidatesRouter = express.Router();

candidatesRouter.get('/:id', candidatesController.getSingleCandidate);
candidatesRouter.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('candidate'),
  candidatesController.editCandidate
);
candidatesRouter.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('candidate'),
  candidatesController.deleteCandidate
);

module.exports = candidatesRouter;