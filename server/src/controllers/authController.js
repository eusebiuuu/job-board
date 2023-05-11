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
		throw new CustomAPIError('Email already exists. Please choose a different email address', StatusCodes.BAD_REQUEST);
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
    throw new CustomAPIError('Please provide email and password', StatusCodes.BAD_REQUEST);
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
    throw new CustomAPIError('Check your email to validate your account', StatusCodes.UNAUTHORIZED);
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
    console.log(token);
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
	const { userID, type } = req.userInfo;
	// console.log(req.userInfo);
	const user = type === 'candidate'
		? await Candidate.findOne({ _id: userID })
		: await Company.findOne({ _id: userID });
	return res.status(StatusCodes.OK).json({
		msg: 'Show current user',
		user,
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
		msg: 'User logged out successfully',
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
		console.log(verificationToken, user.verificationToken);
    throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }
	user.email = email;
  user.verified = new Date(Date.now());
  user.verificationToken = '';
  await user.save();
	return res.status(StatusCodes.OK).json({
		msg: 'Email verified successfully',
	});
}

const changeEmail = async (req, res) => {
	const { newEmail, oldEmail, password, type } = req.body;
	if (!newEmail) {
    throw new CustomAPIError('Invalid email', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
	? await Candidate.findOne({ email: oldEmail })
	: await Company.findOne({ email: oldEmail });
	if (!user) {
		throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
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
	user.tempEmail = newEmail;
	user.verificationToken = verificationToken;
	await user.save();
	const name = type === 'candidate' ? `${user.firstName} ${user.lastName}` : user.name;
	await sendEmail(req, name, newEmail, verificationToken, type, 'verify');
	return res.status(StatusCodes.OK).json({
		msg: 'Please validate your new email address',
	});
}

const forgotPassword = async (req, res) => {
	const { email, type } = req.body;
	if (!email) {
    throw new CustomAPIError('Invalid email', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
		? await Candidate.findOne({ email })
		: await Company.findOne({ email });
	if (!user) {
		return res.status(StatusCodes.OK).json({
			msg: 'Check your email',
		});
	}
	if (!user.verified) {
    throw new CustomAPIError('Please verify your email first', StatusCodes.UNAUTHORIZED);
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
		msg: 'Check your email for validation',
	});
}

const resetPassword = async (req, res) => {
	const { password, type, token } = req.body;
	if (!password) {
    throw new CustomAPIError('Invalid password', StatusCodes.BAD_REQUEST);
	}
	const user = type === 'candidate'
		? await Candidate.findOne({ email, passwordToken: hashToken(token) })
		: await Company.findOne({ email, passwordToken: hashToken(token) });
  if (!user) {
		console.log('User doesn`t exist');
    return res.status(StatusCodes.OK).json({
      msg: 'Password reset successfully',
    });
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
};