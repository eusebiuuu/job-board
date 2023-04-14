import express from 'express'
import * as companiesController from '../controllers/companiesController.mjs'

const router = express.Router();

router.get('/:id', companiesController.getSingleCompany);
router.post('/', companiesController.createCompany);
router.patch('/:id', companiesController.editCompany);
router.delete('/:id', companiesController.deleteCompany);

router.post('/checkout', companiesController.checkout);

export { router as companiesRouter };