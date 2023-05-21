const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../utils/customError');
const Company = require('../models/Company');
const Candidate = require('../models/Candidate');

const uploadImage = async (req, res) => {
  // console.log(req.files);
	if (!req.files) {
		throw new CustomAPIError('No file uploaded', StatusCodes.BAD_REQUEST);
	}
	const curImage = req.files.image;
	if (!curImage.mimetype.startsWith('image')) {
		throw new CustomAPIError('Please upload an image');
	}
	const maxSize = 1024 * 1024 * 10;
	if (curImage.size > maxSize) {
		throw new CustomAPIError('Please upload an image smaller 10MB', StatusCodes.BAD_REQUEST);
	}
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: 'job-board'
		}
	);
  // console.log(result);
	fs.unlinkSync(req.files.image.tempFilePath);
	const { userID, type } = req.userInfo;
	const user = type === 'candidate'
	? await Candidate.findOne({ _id: userID })
	: await Company.findOne({ _id: userID });
	const publicID = user.imagePublicID;
	// console.log(publicID);
	if (publicID) {
		await cloudinary.uploader.destroy(publicID, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				console.log(res);
			}
		});
	}
	user.imagePublicID = result.public_id;
	type === 'candidate'
		? user.image = result.secure_url
		: user.logo = result.secure_url;
	await user.save();
	return res.status(StatusCodes.OK).json({
		image: {
			src: result.secure_url,
			public_id: result.public_id,
		}
	});
};

module.exports = {
	uploadImage,
}