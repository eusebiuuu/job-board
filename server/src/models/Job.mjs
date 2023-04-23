import mongoose from "mongoose";
import { experience, jobTypes, locations } from "../utils/choices.mjs";

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
    type: Number,
    required: [true, 'Minimum salary must be provided'],
  },
  benefits: {
    type: [String],
  },
  jobType: {
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
  city: {
    type: [String],
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
  mustHave: {
    type: [String],
    required: true,
  },
  goodToHave: {
    type: [String],
  },
  companyID: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: true,
    select: true,
  }
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', JobSchema);

export default Job;
