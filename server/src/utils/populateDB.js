const { default: mongoose, isValidObjectId } = require('mongoose');
const jobs = require('../data/jobs.json');
const Job = require('../models/Job');

async function populateDB() {
  await Job.deleteMany();
  for (const job of jobs) {
    job.companyID = new mongoose.Types.ObjectId(job.companyID);
    await Job.create(job);
  }
}

module.exports = populateDB;