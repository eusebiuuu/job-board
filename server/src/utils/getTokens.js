
const getTokens = (cookies) => {
  let lastPos = cookies[0].indexOf(';');
  accessToken = cookies[0].slice(12, lastPos);
  lastPos = cookies[1].indexOf(';');
  refreshToken = cookies[1].slice(13, lastPos);
  return {
    accessToken,
    refreshToken,
  }
}

module.exports = {
  getTokens
}