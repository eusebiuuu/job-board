import express from 'express'

const router = express.Router();

router.get('/', httpGetAllCandidates); // company route

router.get('/:id', httpGetSingleCandidate);
router.post('/', httpCreateCandidate);
router.patch('/:id', httpEditCandidate);
router.delete('/:id', httpDeleteCandidate);

export { router as candidatesRouter };