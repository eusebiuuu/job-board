const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    unique: [true, 'There is already a company with this name. Please change it']
  },
  verified: {
    type: Date,
    default: null,
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
  tempEmail: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    }
  },
  logo: {
    type: String,
    default: 'https://res.cloudinary.com/dwgihvjqj/image/upload/v1683961392/job-board/default-logo_rqto3e.png',
  },
  imagePublicID: {
    type: String,
    default: null,
  },
  aboutUs: {
    type: String,
    maxLength: [1000, 'The description can be maximum 1000 characters'],
  },
  phone: {
    type: String,
  },
  mainHeadquarter: {
    type: String,
  },
  subscriptionExpiration: {
    type: Date,
    default: new Date(Date.now()),
  },
  availablePosts: {
    type: Number,
    default: 0,
  },
  verificationToken: {
    type: String,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  }
});

CompanySchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CompanySchema.methods.comparePassword = async function (curPassword) {
  const isMatch = await bcrypt.compare(curPassword, this.password);
  return isMatch;
};

CompanySchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'companyID',
  justOne: false,
})

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;