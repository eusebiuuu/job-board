const mongoose = require('mongoose');
const validator = require('validator');
const { experience, jobTypes, locations } = require('../utils/choices.js');

const FilterSchema = new mongoose.Schema({
  experience: {
    type: String,
    enum: {
      values: experience,
      message: '{VALUE} is not supported'
    }
  },
  jobType: {
    type: String,
    enum: {
      values: jobTypes,
      message: '{VALUE} is not supported'
    }
  },
  location: {
    type: String,
    enum: {
      values: locations,
      message: '{VALUE} is not supported'
    }
  },
  minSalary: {
    type: Number,
  },
  title: {
    type: String,
    capitalize: true,
  },
  city: {
    type: [String],
    capitalize: true,
  },
  candidateID: {
    type: mongoose.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  }
}, {
  timestamps: true,
});

const Filter = mongoose.model('Filter', FilterSchema);

module.exports = Filter;