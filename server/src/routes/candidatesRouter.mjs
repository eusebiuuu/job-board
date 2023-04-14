import express from 'express'
import * as candidatesController from '../controllers/candidatesController.mjs'

const router = express.Router();

router.get('/', candidatesController.getAllCandidates); // company route

router.get('/:id', candidatesController.getSingleCandidate);
router.post('/', candidatesController.createCandidate);
router.patch('/:id', candidatesController.editCandidate);
router.delete('/:id', candidatesController.deleteCandidate);

export { router as candidatesRouter };