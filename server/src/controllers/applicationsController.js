const { StatusCodes } = require('http-status-codes')
const Application = require('../models/Application.js')
const Job = require('../models/Job.js')
const getIDs = require('../utils/getIDs.js')
const CustomAPIError = require('../utils/customError.js')

const getApplications = async (req, res) => {
  // candidate auth
  const candidateID = '6440093501b470f9983c348f';
  const applications = await Application.find({ candidateID });
  const jobIDs = getIDs(applications, 'jobID');
  const appliedJobs = await Job.find().where('_id').in(jobIDs);
  return res.status(StatusCodes.OK).json({
    jobs: appliedJobs,
  });
}

const createApplication = async (req, res) => {
  // auth candidate
  const candidateID = '6440093501b470f9983c348f';
  const jobID = req.params.id;
  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  const application = await Application.create({
    candidateID,
    jobID,
  });
  return res.status(StatusCodes.CREATED).json({
    application
  });
}

const hideApplication = async (req, res) => {
  // auth company
  const companyID = '643e2fe56955b36ee7f8cca4';
  const jobID = req.params.jobID;
  const candidateID = req.params.candidateID;
  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new CustomAPIError('Job not found', StatusCodes.NOT_FOUND);
  }
  if (job.companyID.toString() !== companyID) {
    throw new CustomAPIError('You aren`t allowed to access other candidates', StatusCodes.FORBIDDEN);
  }
  const application = await Application.findOne({ jobID, candidateID });
  if (!application) {
    throw new CustomAPIError('Application not found', StatusCodes.NOT_FOUND);
  }
  application.show = false;
  await application.save();
  return res.status(StatusCodes.OK).json({
    application,
  });
}

const deleteApplication = async (req, res) => {
  // auth candidate
  const candidateID = '6440093501b470f9983c348f';
  const jobID = req.params.id;
  const application = await Application.findOne({ jobID, candidateID });
  if (!application) {
    throw new CustomAPIError('Application not found', StatusCodes.NOT_FOUND);
  }
  await application.remove();
  return res.status(StatusCodes.OK).json({
    msg: 'Application deleted successfully',
  });
}

module.exports = {
  getApplications,
  createApplication,
  hideApplication,
  deleteApplication,
}