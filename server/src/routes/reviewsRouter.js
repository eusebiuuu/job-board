const express = require('express');
const reviewsController = require('../controllers/reviewsController.js');
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication.js');

const reviewsRouter = express.Router();

reviewsRouter.get('/:id', authenticateUser, authorizePermissions('candidate'), reviewsController.getReview);
reviewsRouter.post('/:id', authenticateUser, authorizePermissions('candidate'), reviewsController.upsertReview);

module.exports = reviewsRouter;