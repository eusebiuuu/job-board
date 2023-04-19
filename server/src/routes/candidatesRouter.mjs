import express from 'express'
import * as candidatesController from '../controllers/candidatesController.mjs'

const candidatesRouter = express.Router();

candidatesRouter.get('/:id', candidatesController.getSingleCandidate);
candidatesRouter.post('/', candidatesController.createCandidate);
candidatesRouter.patch('/:id', candidatesController.editCandidate);
candidatesRouter.delete('/:id', candidatesController.deleteCandidate);

export default candidatesRouter;