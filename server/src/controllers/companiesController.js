const { StatusCodes } = require('http-status-codes');
const Company = require('../models/Company.js');
const Job = require('../models/Job.js');
const Review = require('../models/Review.js');
const CustomAPIError = require('../utils/customError.js');
const Token = require('../models/Token.js');

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
  const companyID = req.userInfo.userID;
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
    msg: 'Company edited successfully',
  });
}

const deleteCompany = async (req, res) => {
  const companyID = req.userInfo.userID;
  const curCompanyID = req.params.id;
  if (companyID !== curCompanyID) {
    throw new CustomAPIError('You aren`t allowed to modify other company', StatusCodes.FORBIDDEN);
  }
  const company = await Company.findOne({ _id: companyID });
  await Job.deleteMany({ companyID });
  await Review.deleteMany({ companyID });
  await Token.deleteOne({
    userID: req.userInfo.userID,
  });
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  await company.remove();
  return res.status(StatusCodes.OK).json({
    msg: `Company deleted successfully`,
  });
}

module.exports = {
  getSingleCompany,
  checkout,
  deleteCompany,
  editCompany
}