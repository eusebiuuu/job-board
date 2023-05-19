const { StatusCodes } = require("http-status-codes");
const Company = require("../models/Company");
const Review = require("../models/Review");
const CustomAPIError = require("../utils/customError");

const upsertReview = async (req, res) => {
  const companyID = req.params.id;
  const company = await Company.find({ _id: companyID });
  if (!company) {
    throw new CustomAPIError('Company doesn`t exist', StatusCodes.NOT_FOUND);
  }
  const candidateID = req.userInfo.userID;
  let rating = req.body.rating;
  let review = await Review.findOne({
    companyID,
    candidateID,
  });
  if (!review) {
    review = await Review.create({
      candidateID,
      companyID,
      rating,
    });
  } else {
    review.rating = rating;
    await review.save();
  }
  return res.status(StatusCodes.OK).json({
    rating: review.rating,
    msg: 'Review edited successfully',
  })
}

const getReview = async (req, res) => {
  const companyID = req.params.id;
  const company = await Company.find({ _id: companyID });
  if (!company) {
    throw new CustomAPIError('Company doesn`t exist', StatusCodes.NOT_FOUND);
  }
  const candidateID = req.userInfo.userID;
  const review = await Review.findOne({
    companyID,
    candidateID,
  });
  if (!review) {
    return res.status(StatusCodes.OK).json({
      rating: 0,
    });
  }
  return res.status(StatusCodes.OK).json({
    rating: review.rating,
  });
}

module.exports = {
  getReview,
  upsertReview,
}