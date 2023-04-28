const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job.js');
const CustomAPIError = require('../utils/customError.js');
const Application = require('../models/Application.js');
const getIDs = require('../utils/getIDs.js');
const Candidate = require('../models/Candidate.js');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  return res.status(StatusCodes.OK).json({
    jobs,
  });
}

const getSingleJob = async (req, res) => {
  const jobID = req.params.id;
  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.OK).json({
    job,
  });
}

const editJob = async (req, res) => {
  // company auth
  const companyID = '643e2fe56955b36ee7f8cca4';
  const jobID = req.params.id;
  const oldJob = await Job.findOne({ _id: jobID });
  if (!oldJob) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  if (oldJob.companyID.toString() !== companyID) {
    throw new CustomAPIError('You aren`t allowed to modify the job', StatusCodes.FORBIDDEN);
  }
  const additionalProps = req.body.job;
  additionalProps.companyID = companyID;
  const editedJob = await Job.findOneAndUpdate({ _id: jobID }, additionalProps, {
    new: true,
    runValidators: true,
  });
  return res.status(StatusCodes.OK).json({
    job: editedJob,
  });
}

const deleteJob = async (req, res) => {
  // company auth
  const companyID = '643e2fe56955b36ee7f8cca4';
  const jobID = req.params.id;
  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  if (job.companyID.toString() !== companyID) {
    throw new CustomAPIError('You aren`t allowed to modify the job', StatusCodes.FORBIDDEN);
  }
  await Application.deleteMany({ jobID });
  await job.remove();
  return res.status(StatusCodes.OK).json({
    msg: 'Job deleted successfully',
  });
}

const addJob = async (req, res) => {
  // company auth
  const companyID = '643e2fe56955b36ee7f8cca4';
  const curJob = req.body.job;
  curJob.companyID = companyID;
  const createdJob = await Job.create(curJob);
  return res.status(StatusCodes.CREATED).json({
    job: createdJob,
  });
}

const getAllAnnouncements = async (req, res) => {
  // company auth
  const companyID = '643e2fe56955b36ee7f8cca4';
  const announcements = await Job.find({ companyID });
  return res.status(StatusCodes.OK).json({
    announcements,
  });
}

const getAllCandidates = async (req, res) => {
  // auth company
  const companyID = '643e2fe56955b36ee7f8cca4';
  const jobID = req.params.id;
  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  if (job.companyID.toString() !== companyID) {
    throw new CustomAPIError('You aren`t allowed to access the candidates', StatusCodes.FORBIDDEN);
  }
  const applications = await Application.find({ jobID, show: true });
  const candidateIDs = getIDs(applications, 'candidateID');
  const candidates = await Candidate.find().where('_id').in(candidateIDs);
  return res.status(StatusCodes.OK).json({
    candidates,
  });
}

module.exports = {
  addJob,
  getAllAnnouncements,
  getAllJobs,
  getSingleJob,
  editJob,
  deleteJob,
  getAllCandidates,
}