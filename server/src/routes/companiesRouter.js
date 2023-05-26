const express = require('express');
const companiesController = require('../controllers/companiesController.js');
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication.js');

const companiesRouter = express.Router();

companiesRouter.post('/checkout',  authenticateUser, authorizePermissions('company'), companiesController.checkout);
companiesRouter.post(
  '/paymentCompletion',
  authenticateUser,
  authorizePermissions('company'),
  companiesController.verifyPayment
);
companiesRouter.get('/:id', companiesController.getSingleCompany);
companiesRouter.patch('/:id', authenticateUser, authorizePermissions('company'), companiesController.editCompany);
companiesRouter.delete('/:id', authenticateUser, authorizePermissions('company'), companiesController.deleteCompany);

module.exports = companiesRouter;