const { StatusCodes } = require('http-status-codes');
const Candidate = require('../models/Candidate.js');
const Application = require('../models/Application.js');
const Review = require('../models/Review.js');
const CustomAPIError = require('../utils/customError.js');
const Token = require('../models/Token.js');

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
	const candidateID = req.userInfo.userID;
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
		msg: 'Candidate edited successfully',
	});
}

const deleteCandidate = async (req, res) => {
	const candidateID = req.userInfo.userID;
	const curCandidateID = req.params.id;
	if (candidateID !== curCandidateID) {
		throw new CustomAPIError('You are not allowed to delete other candidates', StatusCodes.FORBIDDEN);
	}
	const candidate = await Candidate.findOne({ _id: candidateID });
	if (!candidate) {
		throw new CustomAPIError('Profile already deleted', StatusCodes.FORBIDDEN);
	}
	await Application.deleteMany({ candidateID });
	await Review.deleteMany({ candidateID });
	await Token.deleteOne({
		userID: req.userInfo.userID,
	});
	res.cookie('accessToken', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.cookie('refreshToken', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	await candidate.remove();
	return res.status(StatusCodes.OK).json({
		msg: 'Candidate deleted successfully',
	});
}

module.exports = {
	getSingleCandidate,
	editCandidate,
	deleteCandidate,
}