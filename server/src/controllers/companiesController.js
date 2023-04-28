const { StatusCodes } = require('http-status-codes');
const Company = require('../models/Company.js');
const Job = require('../models/Job.js');
const Review = require('../models/Review.js');
const CustomAPIError = require('../utils/customError.js');

const checkout = (req, res) => {
  return res.status(StatusCodes.OK).json({
    msg: 'Checkout',
  });
}

const getSingleCompany = async (req, res) => {
  const companyID = req.params.id;
  const company = await Company.findOne({ _id: companyID });
  if (!company) {
    throw new CustomAPIError('Company not found', StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.OK).json({
    company,
  });
}

const editCompany = async (req, res) => {
  // auth company
  const companyID = '643e2fe56955b36ee7f8cca4';
  const curCompanyID = req.params.id;
  const curCompany = req.body.company;
  if (companyID !== curCompanyID) {
    throw new CustomAPIError('You aren`t allowed to modify other company', StatusCodes.FORBIDDEN);
  }
  const { verified, password, email, subscriptionExpiration, availablePosts, ...goodProps } = curCompany;
  const editedCompany = await Company.findOneAndUpdate({ _id: companyID }, goodProps, {
    new: true,
    runValidators: true,
  });
  return res.status(StatusCodes.OK).json({
    company: editedCompany,
  });
}

const deleteCompany = async (req, res) => {
  // auth company
  const companyID = '643ff220b3534011d64c2e2b';
  const curCompanyID = req.params.id;
  if (companyID !== curCompanyID) {
    throw new CustomAPIError('You aren`t allowed to modify other company', StatusCodes.FORBIDDEN);
  }
  const company = await Company.findOne({ _id: companyID });
  await Job.deleteMany({ companyID });
  await Review.deleteMany({ companyID });
  await company.remove();
  return res.status(StatusCodes.OK).json({
    msg: `Company deleted successfully`,
  });
}

const createCompany = async (req, res) => {
  const curCompany = req.body.company;
  curCompany.subscriptionExpiration = Date.now();
  curCompany.availablePosts = 0;
  curCompany.verified = false;
  const createdCompany = await Company.create(curCompany);
  return res.status(StatusCodes.CREATED).json({
    company: createdCompany,
  });
}

module.exports = {
  createCompany,
  getSingleCompany,
  checkout,
  deleteCompany,
  editCompany
}