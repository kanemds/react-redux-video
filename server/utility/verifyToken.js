const jwt = require('jsonwebtoken');
const createError = require('./error');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401,"Not Authenticated!"));

  jwt.verify(token, process.env.JWT_SECRECT, (error, user) => {
    if (error) return next(createError(403,"Not Valid!"));
    req.user = user;
    next();
  });
};

module.exports = verifyToken;