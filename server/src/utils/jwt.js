const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  // console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const getTokenInfo = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  // console.log(refreshToken);
  const signedAccessToken = createJWT({ payload: { user } });
  const signedRefreshToken = createJWT({ payload: { user, refreshToken } });

  const oneHour = 1000 * 60 * 60;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', signedAccessToken, {
    httpOnly: true,
    maxAge: oneHour,
    secure: false,
    signed: true,
  });
  res.cookie('refreshToken', signedRefreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneMonth),
    secure: false,
    signed: true,
  });
};

module.exports = {
  attachCookiesToResponse,
  getTokenInfo,
}