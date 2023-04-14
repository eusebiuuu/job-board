import { StatusCodes } from 'http-status-codes'

const getAllCandidates = async (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Get all candidates',
    });
}

const getSingleCandidate = async (req, res) => {
    const candidateID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Get candidate with id ${candidateID}`,
    });
}

const editCandidate = async (req, res) => {
    const candidateID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Edit candidate with id ${candidateID}`,
    });
}

const deleteCandidate = async (req, res) => {
    const candidateId = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Delete candidate with id ${candidateId}`,
    });
}

const createCandidate = async (req, res) => {
    const curCandidate = req.body.candidate;
    return res.status(StatusCodes.OK).json({
        msg: `Add candidate`,
        candidate: curCandidate,
    });
}

export {
    getAllCandidates,
    getSingleCandidate,
    createCandidate,
    editCandidate,
    deleteCandidate,
}