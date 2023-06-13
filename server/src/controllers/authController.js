const { StatusCodes } = require("http-status-codes");
const Candidate = require("../models/Candidate");
const CustomAPIError = require("../utils/customError");
const Company = require("../models/Company");
const crypto = require('crypto');
const Token = require("../models/Token");
const { hashToken } = require("../utils/createHash");
const { attachCookiesToResponse } = require("../utils/jwt");
const { sendEmail } = require("../utils/sendEmail");

const register = async (req, res) => {
	const { email, password, type, verified, subscriptionExpiration, availablePosts, ...rest } = req.body.user;
	const user = type === 'candidate' ? await Candidate.findOne({ email }) : await Company.findOne({ email });
	if (user) {
		throw new CustomAPIError('Email already exists. Please choose a different one', StatusCodes.BAD_REQUEST);
	}
	const validName = type === 'candidate' ? rest.firstName && rest.lastName : rest.name;
	if (!email || !password || !validName) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.BAD_REQUEST);
	}
	const verificationToken = crypto.randomBytes(30).toString('hex');
	const createdUser = type === 'candidate'
		? await Candidate.create({ email, password, verificationToken, ...rest })
		: await Company.create({ email, password, verificationToken, ...rest });
	const name = type === 'candidate' ? `${rest.firstName} ${rest.lastName}` : rest.name;
	await sendEmail(req, name, email, verificationToken, type, 'verify');
	return res.status(StatusCodes.CREATED).json({
		msg: 'Registration completed. Check your email to validate it',
		user: createdUser,
	});
}

const login = async (req, res) => {
	const { email, type, password } = req.body;
	if (!email || !password) {
		throw new CustomAPIError('Please provide the email and the password', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate' ? await Candidate.findOne({ email }) : await Company.findOne({ email });
	if (!user) {
		throw new CustomAPIError('Invalid email', StatusCodes.UNAUTHORIZED);
	}
	const validPassword = await user.comparePassword(password);
	if (!validPassword) {
		throw new CustomAPIError('Invalid password', StatusCodes.UNAUTHORIZED);
	}
	if (!user.verified) {
		throw new CustomAPIError('Check your email to validate your account first', StatusCodes.UNAUTHORIZED);
	}
	let refreshToken = '';
	const existingToken = await Token.findOne({ userID: user._id, type });
	const ip = req.ip;
	if (existingToken) {
		if (!existingToken.isValid) {
			throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
		}
		refreshToken = existingToken.refreshToken;
	} else {
		refreshToken = crypto.randomBytes(30).toString('hex');
		const token = await Token.create({ refreshToken, ip, userID: user._id, type });
		// console.log(token);
	}
	const name = type === 'candidate' ? `${user.firstName} ${user.lastName}` : user.name;
	const storedUser = {
		name,
		email,
		type,
		userID: user._id,
	}
	attachCookiesToResponse({ res, user: storedUser, refreshToken });
	return res.status(StatusCodes.OK).json({
		msg: 'Logged in successfully',
		loginInfo: {
			refreshToken, // to delete
			ip, // to delete
			userID: user._id,
			type,
			name,
		}
	});
}

const showCurrentUser = async (req, res) => {
	if (!req.userInfo) {
		return res.status(StatusCodes.OK).json({
			user: null,
		});
	}
	const { userID, type } = req.userInfo;
	const user = type === 'candidate'
		? await Candidate.findOne({ _id: userID })
		: await Company.findOne({ _id: userID });
	return res.status(StatusCodes.OK).json({
		user: user,
		type: type,
	});
}

const logout = async (req, res) => {
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
	return res.status(StatusCodes.OK).json({
		msg: 'You have logged out successfully',
	});
}

const verifyEmail = async (req, res) => {
	const { verificationToken, email, type } = req.body;
	if (!email) {
		throw new CustomAPIError('Invalid email provided', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate' ? await Candidate.findOne({ email }) : await Company.findOne({ email });
	if (!user) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}
	if (verificationToken !== user.verificationToken) {
		// console.log(verificationToken, user.verificationToken);
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}
	user.verified = new Date(Date.now());
	user.verificationToken = '';
	await user.save();
	return res.status(StatusCodes.OK).json({
		msg: 'Email verified successfully',
	});
}

const changeEmail = async (req, res) => {
	const { newEmail, userID, password, type } = req.body;
	if (type === 'candidate' && userID.toString() === '64785efe7961b1b7db8843d6') {
    throw new CustomAPIError('This is a test account. You cannot change its email', StatusCodes.FORBIDDEN);
  }
	if (type === 'company' && userID.toString() === '64785c6e2c8310474ba4b6b0') {
    throw new CustomAPIError('This is a test account. You cannot change its email', StatusCodes.FORBIDDEN);
  }
	if (!newEmail) {
		throw new CustomAPIError('Invalid email', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
		? await Candidate.findOne({ _id: userID })
		: await Company.findOne({ _id: userID });
	if (!user) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}
	if (!user.verified) {
		throw new CustomAPIError('Please verify your current email address first', StatusCodes.UNAUTHORIZED);
	}
	const validPassword = await user.comparePassword(password);
	if (!validPassword) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}
	const existingUser = type === 'candidate'
		? await Candidate.findOne({ email: newEmail })
		: await Company.findOne({ email: newEmail });
	if (existingUser) {
		throw new CustomAPIError('Email already exists', StatusCodes.BAD_REQUEST);
	}
	const verificationToken = crypto.randomBytes(30).toString('hex');
	user.email = newEmail;
	user.verified = null;
	user.verificationToken = verificationToken;
	await user.save();
	const name = type === 'candidate' ? `${user.firstName} ${user.lastName}` : user.name;
	await sendEmail(req, name, newEmail, verificationToken, type, 'verify');
	return res.status(StatusCodes.OK).json({
		msg: 'Modification complete. Please check your email address',
	});
}

const changePassword = async (req, res) => {
	const { userID, oldPassword, newPassword, type } = req.body;
	if (type === 'candidate' && userID.toString() === '64785efe7961b1b7db8843d6') {
    throw new CustomAPIError('This is a test account. You cannot change its password', StatusCodes.FORBIDDEN);
  }
	if (type === 'company' && userID.toString() === '64785c6e2c8310474ba4b6b0') {
    throw new CustomAPIError('This is a test account. You cannot change its password', StatusCodes.FORBIDDEN);
  }
	const user = type === 'candidate'
		? await Candidate.findOne({ _id: userID })
		: await Company.findOne({ _id: userID });
	const validPassword = user.comparePassword(oldPassword);
	if (!validPassword) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}
	if (newPassword.length < 6) {
		throw new CustomAPIError('The password must have minimum 6 characters', StatusCodes.UNAUTHORIZED);
	}
	user.password = newPassword;
	await user.save();
	return res.status(StatusCodes.OK).json({
		msg: 'Password changed successfully',
	})
}

const forgotPassword = async (req, res) => {
	const { email, type } = req.body;
	if (email === 'scashley0@cdc.gov' || email === 'jreddel0@drupal.org') {
    throw new CustomAPIError('This is a test account. You cannot change its password', StatusCodes.FORBIDDEN);
  }
	if (!email) {
		throw new CustomAPIError('Invalid email', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
		? await Candidate.findOne({ email })
		: await Company.findOne({ email });
	if (!user) {
		throw new CustomAPIError('Invalid email', StatusCodes.BAD_REQUEST);
	}
	if (!user.verified) {
		throw new CustomAPIError('Please verify your email address first', StatusCodes.UNAUTHORIZED);
	}
	const passwordToken = crypto.randomBytes(30).toString('hex');
	const expirationPeriod = 1000 * 60 * 10;
	const passwordTokenExpirationDate = new Date(Date.now() + expirationPeriod);
	user.passwordToken = hashToken(passwordToken);
	user.passwordTokenExpirationDate = passwordTokenExpirationDate;
	await user.save();
	const name = type === 'candidate' ? `${user.firstName} ${user.lastName}` : user.name;
	await sendEmail(req, name, email, passwordToken, type, 'reset');
	return res.status(StatusCodes.OK).json({
		msg: 'Data processed. Please, check your email',
	});
}

const resetPassword = async (req, res) => {
	const { password, type, token, email } = req.body;
	if (!password) {
		throw new CustomAPIError('Invalid password', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
		? await Candidate.findOne({ email, passwordToken: hashToken(token) })
		: await Company.findOne({ email, passwordToken: hashToken(token) });
	if (!user) {
		throw new CustomAPIError('User not found', StatusCodes.BAD_REQUEST);
	}
	const currentDate = Date.now();
	if (user.passwordTokenExpirationDate < currentDate) {
		throw new CustomAPIError(
			'The period to reset your password ended. Please do the process again',
			StatusCodes.UNAUTHORIZED,
		);
	}
	user.password = password;
	user.passwordToken = user.passwordTokenExpirationDate = null;
	await user.save();
	return res.status(StatusCodes.OK).json({
		msg: 'Password reset successfully',
	});
}

module.exports = {
	login,
	logout,
	register,
	forgotPassword,
	resetPassword,
	verifyEmail,
	showCurrentUser,
	changeEmail,
	changePassword,
};