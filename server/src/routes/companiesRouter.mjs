import express from 'express'
import * as companiesController from '../controllers/companiesController.mjs'

const companiesRouter = express.Router();

companiesRouter.get('/:id', companiesController.getSingleCompany);
companiesRouter.post('/', companiesController.createCompany);
companiesRouter.patch('/:id', companiesController.editCompany);
companiesRouter.delete('/:id', companiesController.deleteCompany);

companiesRouter.post('/checkout', companiesController.checkout);

export default companiesRouter;