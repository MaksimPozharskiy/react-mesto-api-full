const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const isAuthorized = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports = isAuthorized;
