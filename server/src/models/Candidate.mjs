import mongoose from "mongoose";
import validator from 'validator';

const CandidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide the email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    }
  },
  phone: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  image: {
    type: String,
    default: 'assets/default-profile.jpg',
  },
  abilities: {
    type: [String],
  },
  birthday: {
    type: Date,
  },
  aboutMe: {
    type: String,
  },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;