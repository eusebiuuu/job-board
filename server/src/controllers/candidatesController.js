const { StatusCodes } = require('http-status-codes');
const Candidate = require('../models/Candidate.js');
const Application = require('../models/Application.js');
const Filter = require('../models/Filter.js');
const Review = require('../models/Review.js');
const CustomAPIError = require('../utils/customError.js');

const getSingleCandidate = async (req, res) => {
    const candidateID = req.params.id;
    const candidate = await Candidate.findOne({ _id: candidateID });
    if (!candidate) {
        throw new CustomAPIError('Candidate not found', StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json({
        candidate,
    });
}

const editCandidate = async (req, res) => {
    // auth candidate
    const candidateID = '64510e0c42e7a954c7ae24e5';
    const curCandidateID = req.params.id;
    if (candidateID !== curCandidateID) {
        throw new CustomAPIError('You are not allowed to modify other candidates', StatusCodes.FORBIDDEN);
    }
    const curCandidate = req.body.candidate;
    const { verified, password, email, ...goodProps } = curCandidate;
    const editedCandidate = await Candidate.findOneAndUpdate({ _id: candidateID }, goodProps, {
        new: true,
        runValidators: true,
    });
    return res.status(StatusCodes.OK).json({
        candidate: editedCandidate,
    });
}

const deleteCandidate = async (req, res) => {
    // auth candidate
    const candidateID = '64510e0c42e7a954c7ae24e5';
    const curCandidateID = req.params.id;
    if (candidateID !== curCandidateID) {
        throw new CustomAPIError('You are not allowed to modify other candidates', StatusCodes.FORBIDDEN);
    }
    const candidate = await Candidate.findOne({ _id: candidateID });
    await Application.deleteMany({ candidateID });
    await Filter.deleteMany({ candidateID });
    await Review.deleteMany({ candidateID });
    await candidate.remove();
    return res.status(StatusCodes.OK).json({
        msg: 'Candidate deleted successfully',
    });
}

const createCandidate = async (req, res) => {
    const curCandidate = req.body.candidate;
    curCandidate.verified = false;
    const createdCandidate = await Candidate.create(curCandidate);
    return res.status(StatusCodes.OK).json({
        candidate: createdCandidate,
    });
}

module.exports = {
    getSingleCandidate,
    createCandidate,
    editCandidate,
    deleteCandidate,
}