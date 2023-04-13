import express from 'express'

const router = express.Router();

router.get('/:id', httpGetSingleCompany);
router.post('/', httpCreateCompany);
router.patch('/:id', httpEditCompany);
router.delete('/:id', httpDeleteCompany);

router.post('/checkout', httpCheckout);

export { router as companiesRouter };