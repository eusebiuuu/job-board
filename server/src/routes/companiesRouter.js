const express = require('express');
const companiesController = require('../controllers/companiesController.js');

const companiesRouter = express.Router();

companiesRouter.get('/:id', companiesController.getSingleCompany);
companiesRouter.post('/', companiesController.createCompany);
companiesRouter.patch('/:id', companiesController.editCompany);
companiesRouter.delete('/:id', companiesController.deleteCompany);

companiesRouter.post('/checkout', companiesController.checkout);

module.exports = companiesRouter;