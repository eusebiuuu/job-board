const { StatusCodes } = require('http-status-codes');
const Company = require('../models/Company.js');
const Job = require('../models/Job.js');
const Review = require('../models/Review.js');
const CustomAPIError = require('../utils/customError.js');
const Token = require('../models/Token.js');
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const crypto = require('crypto');

const checkout = async (req, res) => {
  const forwardedHost = req.get('x-forwarded-host') || req.get('host');
  // console.log(req.get('x-forwarded-host'));
  const forwardedProtocol = req.get('x-forwarded-proto') || 'http';
  // console.log(req.get('x-forwarded-proto'));
  const origin = `${forwardedProtocol}://${forwardedHost}`;
  // console.log(origin);
  const { userID: companyID } = req.userInfo;
  const company = await Company.findOne({ _id: companyID });
  if (company.verificationToken) {
    company.verificationToken = null;
    // throw new CustomAPIError(
    //   'User token already exists. Please report the error to the admin',
    //   StatusCodes.BAD_REQUEST,
    // );
  }
  const verificationToken = crypto.randomBytes(30).toString('hex');
  company.verificationToken = verificationToken;
  await company.save();

  const { monthly } = req.body;
  const recurring = { interval: 'month' };
  const queries = `monthly=${monthly}&token=${verificationToken}`;
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: monthly ? 'Subscription' : 'One-time payment',
        },
        unit_amount: monthly ? 20 * 100 : 10 * 100,
        ...(monthly) && { recurring }
      },
      quantity: 1,
    }],
    mode: monthly ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    success_url: `${origin}/payment-completion?success=true&${queries}`,
    cancel_url: `${origin}/payment-completion?cancelled=true&${queries}`,
  });
  return res.status(StatusCodes.OK).json({
    url: session.url,
  });
}

const verifyPayment = async (req, res) => {
  const { monthly, token } = req.body;
  const { userID: companyID } = req.userInfo;
  const company = await Company.findOne({ _id: companyID });
  if (token !== company.verificationToken) {
    throw new CustomAPIError('Invalid payment', StatusCodes.FORBIDDEN);
  }
  company.verificationToken = null;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  if (monthly) {
    company.availablePosts = 1000;
    company.subscriptionExpiration = Date.now() + oneMonth;
  } else {
    const oneYear = oneMonth * 12;
    company.availablePosts = 30;
    company.subscriptionExpiration = Date.now() + oneYear;
  }
  // console.log(company.subscriptionExpiration);
  await company.save();
  return res.status(StatusCodes.OK).json({
    msg: 'Payment completed successfully',
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
  const { verified, password, email, subscriptionExpiration, logo, imagePublicID, availablePosts, ...goodProps } = curCompany;
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
  if (companyID.toString() === '64785c6e2c8310474ba4b6b0') {
    throw new CustomAPIError('This is a test account. You cannot delete it', StatusCodes.FORBIDDEN);
  }
  // console.log('Oh oh');
  // return;
  const company = await Company.findOne({ _id: companyID });
  if (!company) {
		throw new CustomAPIError('Account already deleted', StatusCodes.FORBIDDEN);
	}
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
  verifyPayment,
  deleteCompany,
  editCompany
}