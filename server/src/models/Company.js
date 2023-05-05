const mongoose = require('mongoose');
const validator = require('validator');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    unique: [true, 'There is already a company with this name. Please change it']
  },
  verified: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minLength: 6,
    select: true
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
  logo: {
    type: String,
    default: 'assets/default-logo.jpg',
  },
  aboutUs: {
    type: String,
    required: true,
    maxLength: [1000, 'The description can be maximum 1000 characters'],
  },
  phone: {
    type: String,
  },
  mainHeadquarter: {
    type: String,
    required: true,
  },
  subscriptionExpiration: {
    type: Date,
    required: true,
  },
  availablePosts: {
    type: Number,
    required: true,
  },
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;