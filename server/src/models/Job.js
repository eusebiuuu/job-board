const mongoose = require('mongoose');
const { experience, jobTypes, locations } = require("../utils/choices.js");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field must be provided'],
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: [true, 'Description field must be provided'],
  },
  minSalary: {
    type: String,
    default: '',
  },
  benefits: {
    type: [String],
    default: [],
  },
  jobTypes: {
    type: [String],
    default: ['full-time'],
    validate: [(val) => {
      let valid = true;
      val.map(v => {
        if (!jobTypes.includes(v.toLowerCase())) {
          valid = false;
        }
      });
      return valid;
    }, 'Please provide valid job types']
  },
  cities: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    default: 'office',
    validate: [val => {
      return locations.includes(val.toLowerCase());
    }, 'Please provide a valid job location']
  },
  experience: {
    type: String,
    default: 'no experience',
    validate: [val => {
      return experience.includes(val.toLowerCase());
    }, 'Please provide a valid experience']
  },
  requirements: {
    type: String,
    required: true,
  },
  companyID: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: true,
  }
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
