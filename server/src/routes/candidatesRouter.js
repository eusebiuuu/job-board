const express = require('express');
const candidatesController = require('../controllers/candidatesController.js');

const candidatesRouter = express.Router();

candidatesRouter.get('/:id', candidatesController.getSingleCandidate);
candidatesRouter.post('/', candidatesController.createCandidate);
candidatesRouter.patch('/:id', candidatesController.editCandidate);
candidatesRouter.delete('/:id', candidatesController.deleteCandidate);

module.exports = candidatesRouter;