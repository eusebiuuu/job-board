const { StatusCodes } = require('http-status-codes');
const Token = require('../models/Token');
const { getTokenInfo, attachCookiesToResponse } = require('../utils/jwt');
const CustomAPIError = require('../utils/customError');

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  // console.log(refreshToken);
  try {
    if (accessToken) {
      const payload = getTokenInfo(accessToken);
      req.userInfo = payload.user;
      return next();
    }
    const payload = getTokenInfo(refreshToken);
    // console.log(payload);
    const existingToken = await Token.findOne({
      refreshToken: payload.refreshToken,
      userID: payload.user.userID,
    });
    if (!existingToken || !existingToken.isValid) {
      throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
    }
    attachCookiesToResponse({ res, user: payload.user, refreshToken: payload.refreshToken });
    // console.log(payload.user);
    req.userInfo = payload.user;
    return next();
  } catch (error) {
    throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
  }
};

const authorizePermissions = (allowedType) => {
  return (req, res, next) => {
    if (req.userInfo.type !== allowedType) {
      throw new CustomAPIError(
        'Unauthorized to access this route',
        StatusCodes.FORBIDDEN,
      );
    }
    next();
  };
};

const authenticateCandidate = async (req, res, next) => {
  if (!req.signedCookies) {
    return next();
  }
  const { refreshToken, accessToken } = req.signedCookies;
  if (!accessToken || !refreshToken) {
    return next();
  }
  try {
    if (accessToken) {
      const payload = getTokenInfo(accessToken);
      req.userInfo = payload.user;
      return next();
    }
    const payload = getTokenInfo(refreshToken);
    const existingToken = await Token.findOne({
      refreshToken: payload.refreshToken,
      user: payload.user.userID,
    });
    // console.log(existingToken);
    if (!existingToken || !existingToken.isValid) {
      throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
    }
    attachCookiesToResponse({ res, user: payload.user, refreshToken: payload.refreshToken });
    req.userInfo = payload.user;
    return next();
  } catch (error) {
    throw new CustomAPIError('Invalid authentication', StatusCodes.UNAUTHORIZED);
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
  authenticateCandidate,
};