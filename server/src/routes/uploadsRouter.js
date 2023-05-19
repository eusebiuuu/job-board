const express = require('express');
const uploadsController = require('../controllers/uploadsController.js');
const { authenticateUser } = require('../middlewares/authentication.js');

const uploadsRouter = express.Router();

uploadsRouter.post('/', authenticateUser, uploadsController.uploadImage);
uploadsRouter.post('/delete', authenticateUser, uploadsController.deleteImage);

module.exports = uploadsRouter;