import { StatusCodes } from 'http-status-codes'
import Candidate from '../models/Candidate.mjs';
import Application from '../models/Application.mjs';
import Filter from '../models/Filter.mjs';
import Review from '../models/Review.mjs';
import CustomAPIError from '../utils/customError.mjs';

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
    const candidateID = '643fc73b3e42965392bffdb7';
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
    const candidateID = '643fc73b3e42965392bffdb7';
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

export {
    getSingleCandidate,
    createCandidate,
    editCandidate,
    deleteCandidate,
}