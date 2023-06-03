const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: true,
  },
  verified: {
    type: Date,
    default: null,
  },
  education: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dwgihvjqj/image/upload/v1683961362/job-board/default-profile_h6gpon.png',
  },
  imagePublicID: {
    type: String,
    default: null,
  },
  abilities: {
    type: [String],
    default: [],
  },
  birthday: {
    type: String,
    default: '',
  },
  aboutMe: {
    type: String,
    default: '',
  },
  verificationToken: {
    type: String,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  }
});

CandidateSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CandidateSchema.methods.comparePassword = async function (curPassword) {
  const isMatch = await bcrypt.compare(curPassword, this.password);
  return isMatch;
};

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;