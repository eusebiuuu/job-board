const express = require('express');
const companiesController = require('../controllers/companiesController.js');
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication.js');

const companiesRouter = express.Router();

companiesRouter.get('/:id', companiesController.getSingleCompany);
companiesRouter.patch('/:id', authenticateUser, authorizePermissions('company'), companiesController.editCompany);
companiesRouter.delete('/:id', authenticateUser, authorizePermissions('company'), companiesController.deleteCompany);

companiesRouter.post('/checkout',  authenticateUser, authorizePermissions('company'), companiesController.checkout);

module.exports = companiesRouter;